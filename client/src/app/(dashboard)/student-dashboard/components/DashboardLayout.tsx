"use client";

import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <Sidebar />
      <Navbar />
      <main className="ml-[220px] pt-16">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
