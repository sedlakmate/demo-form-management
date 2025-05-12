"use client";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001";

export default function Web() {
  console.log("API_HOST", API_HOST);
  return (
    <div>
      <h1>Hello world</h1>
    </div>
  );
}
