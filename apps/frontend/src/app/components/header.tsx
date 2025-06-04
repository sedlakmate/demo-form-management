"use client";

import ThemeSelector from "./theme-selector";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function Header() {
  const router = useRouter();
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    setHasToken(
      typeof window !== "undefined" && !!localStorage.getItem("admin-token"),
    );
    const onStorage = () => setHasToken(!!localStorage.getItem("admin-token"));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin-token");
    setHasToken(false);
    router.push("/admin/login");
  };

  return (
    <header className="navbar bg-base-200 shadow">
      <div className="flex-1 px-4 text-xl font-bold">
        Admin form management demo
      </div>
      {hasToken && (
        <button className="btn btn-ghost" onClick={handleLogout}>
          Logout
        </button>
      )}
      <ThemeSelector justifyEnd={true} />
    </header>
  );
}
