import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";

// FIXME: resolve slug to actual file path (Sanity asset URL or stored mapping)
const PDF_PATH = "/Users/adtimokhin/Desktop/newspaper.pdf";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  await params;
  try {
    const data = readFileSync(PDF_PATH);
    return new NextResponse(data, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
