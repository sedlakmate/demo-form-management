import "../../globals.css";
import type { ReactNode } from "react";
import { Footer } from "./components/footer";
import { Header } from "./components/header";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="abyss">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto p-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
