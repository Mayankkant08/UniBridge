"use client";

import { Check, X, UserCircle2 } from "lucide-react";

// Define prop types
interface OutpassCardProps {
  name: string;
  enrolment: string;
  timing: string;
  reason: string;
  profile?: string; // optional for now
  status: "pending" | "approved" | "denied";
}

export default function OutpassCard({
  name,
  enrolment,
  timing,
  reason,
  status,
}: OutpassCardProps) {
  return (
    <div className="grid grid-cols-5 items-center px-6 py-3 text-sm border-b hover:bg-gray-50 transition">
      {/* Student */}
      <div className="flex items-center gap-3">
        <div className="text-gray-500">
          <UserCircle2 size={36} strokeWidth={1.5} />
        </div>
        <span className="font-medium text-gray-900">{name}</span>
      </div>

      {/* Enrolment */}
      <span className="text-gray-600">{enrolment}</span>

      {/* Outpass Timing */}
      <span className="text-gray-600">{timing}</span>

      {/* Reason */}
      <span className="text-gray-600 truncate">{reason}</span>

      {/* Action */}
      <div className="flex justify-end gap-2">
        {status === "pending" ? (
          <>
            <button className="px-3 py-1 rounded-md bg-green-100 text-green-700 hover:bg-green-200 flex items-center gap-1 text-xs">
              <Check size={14} /> Approve
            </button>
            <button className="px-3 py-1 rounded-md bg-red-100 text-red-700 hover:bg-red-200 flex items-center gap-1 text-xs">
              <X size={14} /> Reject
            </button>
          </>
        ) : (
          <span
            className={`px-3 py-1 rounded-md text-xs font-medium ${
              status === "approved"
                ? "text-green-700 bg-green-50"
                : "text-red-700 bg-red-50"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        )}
      </div>
    </div>
  );
}
