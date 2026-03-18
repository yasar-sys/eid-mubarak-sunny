import { supabase } from "@/integrations/supabase/client";

const SETUP_SOURCE_PAGE = "scene0-setup";

export async function saveVisitorName(name: string) {
  const trimmedName = name.trim();

  if (!trimmedName) {
    throw new Error("Name is required");
  }

  const { error } = await supabase.from("visitor_name_submissions").insert({
    name: trimmedName,
    source_page: SETUP_SOURCE_PAGE,
  });

  if (error) {
    throw error;
  }
}
