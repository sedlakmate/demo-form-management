import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  try {
    const backendUrl = process.env.BACKEND_URL;
    if (!backendUrl) {
      return NextResponse.json(
        { error: "BACKEND_URL is not set" },
        { status: 500 },
      );
    }
    const backendRes = await fetch(backendUrl + "/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (backendRes.ok) {
      return NextResponse.json({ success: true });
    }
    let data;
    try {
      data = await backendRes.json();
    } catch (e) {
      data = {
        error: `Backend returned status ${backendRes.status}: ${backendRes.statusText}`,
      };
    }
    return NextResponse.json(
      {
        error:
          data.error ||
          `Backend returned status ${backendRes.status}: ${backendRes.statusText}`,
      },
      { status: backendRes.status },
    );
  } catch (err: any) {
    console.error("Login API route error:", err);
    return NextResponse.json(
      { error: err?.message || "Login failed" },
      { status: 500 },
    );
  }
}
