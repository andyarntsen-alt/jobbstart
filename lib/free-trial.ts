import { redis } from "@/lib/redis";

const FREE_TRIAL_PREFIX = "ft:app:";
const FREE_TRIAL_LIMIT = 1;
const FREE_TRIAL_TTL = 60 * 60 * 24 * 365; // 1 year in seconds

export async function checkFreeTrialApplication(ip: string): Promise<{
  allowed: boolean;
  used: number;
  limit: number;
}> {
  if (!redis) {
    // No Redis = development mode, allow all
    return { allowed: true, used: 0, limit: FREE_TRIAL_LIMIT };
  }

  const key = `${FREE_TRIAL_PREFIX}${ip}`;
  const used = (await redis.get<number>(key)) ?? 0;

  return {
    allowed: used < FREE_TRIAL_LIMIT,
    used,
    limit: FREE_TRIAL_LIMIT,
  };
}

export async function consumeFreeTrialApplication(ip: string): Promise<void> {
  if (!redis) return;

  const key = `${FREE_TRIAL_PREFIX}${ip}`;
  const current = (await redis.get<number>(key)) ?? 0;
  await redis.set(key, current + 1, { ex: FREE_TRIAL_TTL });
}
