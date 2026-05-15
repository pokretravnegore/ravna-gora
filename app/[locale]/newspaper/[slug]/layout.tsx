import type { Metadata } from "next";
import { client } from "../../../../sanity/lib/client";
import { urlFor, type SanityImage } from "../../../../sanity/lib/image";

type IssueMetadata = {
  issueNumber: number;
  issueDate: string;
  image: SanityImage;
};

async function getIssueMetadata(slug: string): Promise<IssueMetadata | null> {
  return client.fetch(
    `*[_type == "newspaperIssue" && slug.current == $slug][0] {
      issueNumber,
      issueDate,
      image
    }`,
    { slug }
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const issue = await getIssueMetadata(slug);
  if (!issue) return {};

  const title = `Issue #${issue.issueNumber}`;
  const imageUrl = urlFor(issue.image).width(1200).height(630).fit("crop").auto("format").url();

  return {
    title,
    openGraph: {
      title,
      images: [{ url: imageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      images: [imageUrl],
    },
  };
}

export default function NewspaperLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
