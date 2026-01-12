import { createSupabaseServerClient } from "@/lib/supabaseServer";

export type CmsPage = {
  title?: string;
  subtitle?: string;
  content?: {
    paragraphs?: string[];
  };
  image_url?: string;
};

export async function getCmsPageServer(
  slug: string,
  fallback: CmsPage
): Promise<CmsPage> {
  try {
    const supabase = await createSupabaseServerClient();

    const { data } = await supabase
      .from("cms_pages")
      .select("title, subtitle, content, image_url")
      .eq("slug", slug)
      .single();

    return { ...fallback, ...data };
  } catch {
    return fallback;
  }
}
