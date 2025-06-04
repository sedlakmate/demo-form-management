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

export async function POST(req: NextRequest) {
  const backendUrl = process.env.BACKEND_URL;
  if (!backendUrl) {
    return NextResponse.json(
      { error: "BACKEND_URL is not set" },
      { status: 500 },
    );
  }
  const authHeader = req.headers.get("authorization");
  const body = await req.text();
  try {
    const backendRes = await fetch(backendUrl + "/admin/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      body,
    });
    const data = await backendRes.json();
    if (!backendRes.ok) {
      return NextResponse.json(
        { error: data.error || "Failed to create form" },
        { status: backendRes.status },
      );
    }
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to create form" },
      { status: 500 },
    );
  }
}
