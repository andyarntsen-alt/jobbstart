import { getSupabaseClient } from "./client";
import type { ContactInfo } from "@/types/application";
import type { CVData } from "@/types/cv";
import type { SavedApplication, SavedCV } from "@/types/dashboard";

export async function saveApplication(
  userId: string,
  data: {
    generatedText: string;
    jobDescription: string;
    userBackground: string;
    jobTitle?: string;
    template: string;
    layout: string;
    contactInfo: ContactInfo;
    wordCount: number;
  }
): Promise<{ id: string } | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data: row, error } = await supabase
    .from("applications")
    .insert({
      user_id: userId,
      generated_text: data.generatedText,
      job_description: data.jobDescription,
      user_background: data.userBackground,
      job_title: data.jobTitle || null,
      template: data.template,
      layout: data.layout,
      contact_info: data.contactInfo,
      word_count: data.wordCount,
    })
    .select("id")
    .single();

  if (error) return null;
  return { id: row.id };
}

export async function fetchApplications(
  userId: string
): Promise<SavedApplication[]> {
  const supabase = getSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("applications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id,
    generatedText: row.generated_text,
    jobDescription: row.job_description,
    userBackground: row.user_background,
    jobTitle: row.job_title,
    template: row.template,
    layout: row.layout,
    contactInfo: row.contact_info as ContactInfo,
    wordCount: row.word_count,
    createdAt: row.created_at,
  }));
}

export async function deleteApplication(
  userId: string,
  id: string
): Promise<boolean> {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  const { error } = await supabase
    .from("applications")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  return !error;
}

export async function saveCV(userId: string, data: CVData): Promise<boolean> {
  const supabase = getSupabaseClient();
  if (!supabase) return false;

  const { error } = await supabase.from("cvs").upsert(
    {
      user_id: userId,
      data: data as unknown as Record<string, unknown>,
      template: data.template,
      name: data.personal.name || null,
    },
    { onConflict: "user_id" }
  );

  return !error;
}

export async function fetchCV(
  userId: string
): Promise<SavedCV | null> {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("cvs")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    data: data.data as unknown as CVData,
    template: data.template,
    name: data.name,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}
