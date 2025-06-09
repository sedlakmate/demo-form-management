import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { token: string } },
) {
  const backendUrl = process.env.NEXT_PUBLIC_API_HOST;
  if (!backendUrl) {
    return NextResponse.json(
      { error: "NEXT_PUBLIC_API_HOST is not set" },
      { status: 500 },
    );
  }
  const authHeader = req.headers.get("authorization");
  const { token } = params;
  try {
    const backendRes = await fetch(`${backendUrl}/admin/form/${token}`, {
      method: "DELETE",
      headers: authHeader ? { Authorization: authHeader } : {},
    });
    if (!backendRes.ok) {
      const data = await backendRes.json().catch(() => ({}));
      return NextResponse.json(
        { error: data.error || "Failed to delete form" },
        { status: backendRes.status },
      );
    }
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to delete form" },
      { status: 500 },
    );
  }
}
