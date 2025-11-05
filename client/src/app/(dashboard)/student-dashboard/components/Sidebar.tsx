"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  GitBranch,
  CheckSquare,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { MdOutlineHowToReg } from "react-icons/md";
// import { RiLogoutBoxLine } from "react-icons/ri";
import { HiOutlineLogout } from "react-icons/hi"; // subtle rounded variant
// import { IoExitOutline } from "react-icons/io5"; // simple door exit icon
// import { MdApproval } from "react-icons/md"; // tick with authority feel
// import { FaFileSignature } from "react-icons/fa6"; // looks like a signed pass
// import { HiOutlineClipboardCheck } from "react-icons/hi"; // approved pass feel
// import { PiDoorOpenLight } from "react-icons/pi"; // elegant “open door” symbol
// import { TbArrowUpRight } from "react-icons/tb"; // abstract but modern “exit” direction
// import { FaWalking } from "react-icons/fa"; // literal “going 
import { LuBookOpenCheck } from "react-icons/lu";


import { cn } from "../../../../../lib/utils";
import { useState } from "react";
import { Badge } from "../../../../../components/ui/badge";

const menuItems = [
  { icon: LayoutDashboard, label: "Home", href: "/" },
  { icon: MdOutlineHowToReg, label: "Attendence", href: "/contacts" },
  { icon: LuBookOpenCheck, label: "Courses", href: "/courses" },
  { icon: HiOutlineLogout, label: "Outpass", href: "/outpass" },
  { icon: FaChalkboardTeacher, label: "Teacher Info", href: "/integration" },
];

const bottomMenuItems = [
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: HelpCircle, label: "Help & Support", href: "/help", badge: "8" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[220px] bg-white flex flex-col h-screen fixed left-0 top-0" style={{ borderRight: "1px solid #1E1E1E20" }}>
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-lg">Plan</span>
        </div>
      </div>

      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");

            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                    isActive
                      ? "bg-gray-100 text-gray-900 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="flex-1">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-3 pb-4 pt-4" style={{ borderTop: "1px solid #1E1E1E20" }}>
        <ul className="space-y-1">
          {bottomMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                    isActive
                      ? "bg-gray-100 text-gray-900 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="bg-yellow-400 text-black text-xs px-1.5 py-0">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
