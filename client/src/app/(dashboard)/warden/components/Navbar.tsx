"use client";

import { Search, Sparkles, User, Bell, ChevronDown } from "lucide-react";
import { Input } from "../../../../../components/ui/input";
import { Button } from "../../../../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../../components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../../components/ui/dropdown-menu";

export function Navbar() {
  return (
    <header className="h-16 bg-white fixed top-0 right-0 left-[220px] z-10" style={{ borderBottom: "1px solid #1E1E1E20", boxShadow: "0 1px 3px rgba(30, 30, 30, 0.08)" }}>
      <div className="h-full px-6 flex items-center justify-between">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search or type a command"
              className="pl-10 bg-gray-50 focus-visible:ring-1 focus-visible:ring-gray-300"
              style={{ borderColor: "#1E1E1E20" }}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">

          <Button variant="ghost" size="icon" className="relative">
            <User className="w-5 h-5 text-gray-600" />
          </Button>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5 text-gray-600" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
