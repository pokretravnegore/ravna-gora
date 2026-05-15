import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { createClient } from "next-sanity";

// Bypass CDN so published documents are always visible immediately
const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// FIXME: remove once CMS is populated
const DEV_FALLBACK_PATH = "/Users/adtimokhin/Desktop/newspaper.pdf";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Try the archive first
  const issue = await serverClient.fetch<{ pdfUrl: string } | null>(
    `*[_type == "newspaperIssue" && slug.current == $slug][0] {
      "pdfUrl": pdfFile.asset->url
    }`,
    { slug }
  );

  if (issue?.pdfUrl) {
    return NextResponse.redirect(issue.pdfUrl);
  }

  // Fall back to the current-newspaper singleton (legacy / dev)
  const current = await serverClient.fetch<{ pdfUrl: string } | null>(
    `*[_type == "currentNewspaper"][0] { "pdfUrl": pdfFile.asset->url }`
  );

  if (current?.pdfUrl) {
    return NextResponse.redirect(current.pdfUrl);
  }

  // Fall back to local file while CMS document is not yet published
  try {
    const file = readFileSync(DEV_FALLBACK_PATH);
    return new NextResponse(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new NextResponse("No newspaper configured in CMS", { status: 404 });
  }
}
