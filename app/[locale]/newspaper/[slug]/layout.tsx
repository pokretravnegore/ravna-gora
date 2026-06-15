import type { Metadata } from "next";
import { supabase } from "../../../../lib/supabase";
import type { Issue } from "../../../../lib/types";

async function getIssueMetadata(slug: string): Promise<Issue | null> {
  const { data } = await supabase
    .from("issues")
    .select("issue_number, issue_date, cover_image_url, title, id, slug, pdf_object_key, published, created_at, updated_at")
    .eq("slug", slug)
    .single();
  return (data as Issue) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const issue = await getIssueMetadata(slug);
  if (!issue) return {};

  const title = issue.title ?? `Issue #${issue.issue_number}`;
  const images = issue.cover_image_url
    ? [{ url: issue.cover_image_url, width: 1200, height: 630 }]
    : [];

  return {
    title,
    openGraph: { title, images },
    twitter: {
      card: "summary_large_image",
      title,
      images: images.map((i) => i.url),
    },
  };
}

export default function NewspaperLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
