import { supabase } from "@/lib/supabaseClient";

export type CmsPage = {
  title?: string;
  subtitle?: string;
  content?: {
    paragraphs?: string[];
  };
  image_url?: string;
};

export async function getCmsPage(
  slug: string,
  fallback: CmsPage
): Promise<CmsPage> {
  try {
    const { data, error } = await supabase
      .from("cms_pages")
      .select("title, subtitle, content, image_url")
      .eq("slug", slug)
      .single();

    if (error || !data) return fallback;
    return { ...fallback, ...data };
  } catch {
    return fallback;
  }
}
