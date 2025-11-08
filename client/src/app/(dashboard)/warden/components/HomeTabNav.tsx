"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../../../../lib/utils";

export function HomeTabNav() {
  const pathname = usePathname();
  const isPersonalSpace = pathname === "/" || pathname === "/personal-space";
  const isMails = pathname === "/mails";

  return (
    <div className="flex gap-6" style={{ borderBottom: "1px solid #1E1E1E20" }}>
      <Link
        href="/"
        className={cn(
          "px-4 py-4 text-sm font-medium transition-colors relative",
          isPersonalSpace
            ? "text-gray-900"
            : "text-gray-500 hover:text-gray-700"
        )}
        style={
          isPersonalSpace
            ? { borderBottom: "2px solid #1E1E1E" }
            : { borderBottom: "2px solid transparent" }
        }
      >
        Personal Space
      </Link>
      <Link
        href="/mails"
        className={cn(
          "px-4 py-4 text-sm font-medium transition-colors relative",
          isMails
            ? "text-gray-900"
            : "text-gray-500 hover:text-gray-700"
        )}
        style={
          isMails
            ? { borderBottom: "2px solid #1E1E1E" }
            : { borderBottom: "2px solid transparent" }
        }
      >
        Mails
      </Link>
    </div>
  );
}
