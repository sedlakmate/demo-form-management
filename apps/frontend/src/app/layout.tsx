import "../../globals.css";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="light">
      <body className="min-h-screen flex flex-col">
        <header className="navbar bg-base-100 shadow">
          <div className="flex-1 px-4 text-xl font-bold">
            🎵 Song Library Demo
          </div>
        </header>

        <main className="flex-grow container mx-auto p-4">{children}</main>

        <footer className="footer footer-center p-4 bg-base-200 text-base-content">
          <p>© 2025 Máté Sedlák</p>
        </footer>
      </body>
    </html>
  );
}
