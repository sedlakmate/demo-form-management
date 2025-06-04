"use client";

import ThemeSelector from "./theme-selector";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function Header() {
  const router = useRouter();
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    function checkToken() {
      setHasToken(
        typeof window !== "undefined" && !!localStorage.getItem("admin-token"),
      );
    }
    checkToken();
    const onStorage = () => checkToken();
    window.addEventListener("storage", onStorage);
    // Listen for custom event in case localStorage is set in the same tab
    window.addEventListener("admin-token-changed", checkToken);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("admin-token-changed", checkToken);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("admin-token");
    setHasToken(false);
    window.dispatchEvent(new Event("admin-token-changed"));
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
