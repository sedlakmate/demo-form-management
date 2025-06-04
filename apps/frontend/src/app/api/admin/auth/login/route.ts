import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) {
    return new NextResponse(
      JSON.stringify({ error: "Backend URL not configured" }),
      { status: 500 },
    );
  }
  const backendRes = await fetch(`${backendUrl}/api/admin/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": req.headers.get("content-type") || "application/json",
    },
    body,
  });
  const data = await backendRes.text();
  return new NextResponse(data, {
    status: backendRes.status,
    headers: {
      "content-type":
        backendRes.headers.get("content-type") || "application/json",
    },
  });
}
