import { NextRequest, NextResponse } from "next/server";

const WORKER_URL = process.env.NEXT_PUBLIC_WORKER_URL ?? "http://localhost:8787";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    return new NextResponse("Authentication required", { status: 401 });
  }

  const workerRes = await fetch(`${WORKER_URL}/issues/${slug}/pdf`, {
    headers: { Authorization: authHeader },
  });

  if (!workerRes.ok) {
    return new NextResponse(await workerRes.text(), { status: workerRes.status });
  }

  return new NextResponse(workerRes.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${slug}.pdf"`,
    },
  });
}
