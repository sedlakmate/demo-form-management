import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) {
    return NextResponse.json(
      { error: "BACKEND_URL is not set" },
      { status: 500 },
    );
  }
  const authHeader = req.headers.get("authorization");
  try {
    const backendRes = await fetch(backendUrl + "/admin/form", {
      headers: authHeader ? { Authorization: authHeader } : {},
    });
    if (!backendRes.ok) {
      const data = await backendRes.json();
      return NextResponse.json(
        { error: data.error || "Failed to fetch forms" },
        { status: backendRes.status },
      );
    }
    const forms = await backendRes.json();
    return NextResponse.json({ forms });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to fetch forms" },
      { status: 500 },
    );
  }
}
