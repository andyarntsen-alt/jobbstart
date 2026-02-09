import { getSupabaseServer } from "@/lib/supabase/server";
import { NextRequest } from "next/server";

/**
 * Server-side admin verification.
 * Extracts the Bearer token from the Authorization header,
 * verifies it against Supabase, and checks if the user has admin privileges.
 */
export async function verifyAdmin(
  req: NextRequest
): Promise<{ isAdmin: boolean; userId: string | null }> {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return { isAdmin: false, userId: null };
  }

  const supabase = getSupabaseServer();
  if (!supabase) {
    return { isAdmin: false, userId: null };
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(authHeader.slice(7));

  if (error || !user) {
    return { isAdmin: false, userId: null };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  return { isAdmin: profile?.is_admin ?? false, userId: user.id };
}
