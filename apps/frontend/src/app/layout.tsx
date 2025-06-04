import "../../globals.css";
import type { ReactNode } from "react";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { AuthProvider } from "./admin/AuthContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="abyss">
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <Header />
          <main className="flex-grow container mx-auto p-4">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
