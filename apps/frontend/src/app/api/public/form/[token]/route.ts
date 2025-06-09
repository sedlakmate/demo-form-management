import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { token: string } },
) {
  const backendUrl = process.env.NEXT_PUBLIC_API_HOST;
  if (!backendUrl) {
    return new NextResponse(
      JSON.stringify({ error: "Backend URL not configured" }),
      { status: 500 },
    );
  }
  const backendRes = await fetch(`${backendUrl}/public/form/${params.token}`);
  const data = await backendRes.text();
  return new NextResponse(data, {
    status: backendRes.status,
    headers: {
      "content-type":
        backendRes.headers.get("content-type") || "application/json",
    },
  });
}
