import type { PlanId } from "@/lib/plans";

export interface Profile {
  id: string;
  email: string;
  plan: PlanId;
  is_admin: boolean;
  applications_remaining: number;
  applications_used: number;
  free_trial_used: boolean;
  improve_experience_used: number;
  purchased_at: string | null;
  stripe_session_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface Purchase {
  id: string;
  user_id: string | null;
  plan: string;
  amount: number;
  currency: string;
  stripe_session_id: string;
  stripe_email: string | null;
  created_at: string;
}
