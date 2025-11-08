"use client";

import { useState } from "react";
import OutpassCard from "./OutpassCard";

// Define type for requests
type OutpassStatus = "pending" | "approved" | "denied";

interface OutpassRequest {
  id: number;
  name: string;
  enrolment: string;
  timing: string;
  reason: string;
  profile?: string;
  status: OutpassStatus;
}

export default function OutpassQueue() {
  const [activeTab, setActiveTab] = useState("queue");

  const tabs = [
    { key: "queue", label: "Queue" },
    { key: "approved", label: "Approved" },
    { key: "denied", label: "Denied" },
  ];

  // ✅ Now requests is explicitly typed
  const requests: OutpassRequest[] = [
    {
      id: 1,
      name: "Riya Sharma",
      enrolment: "BTECH2023123",
      timing: "9 Nov 2025, 10:00 AM - 8:00 PM",
      reason: "Medical appointment at City Hospital",
      profile: "https://i.pravatar.cc/150?img=47",
      status: "pending",
    },
    {
      id: 2,
      name: "Arjun Patel",
      enrolment: "BTECH2023118",
      timing: "10 Nov 2025, 7:00 AM - 6:00 PM",
      reason: "Family event at home",
      profile: "https://i.pravatar.cc/150?img=12",
      status: "approved",
    },
    {
      id: 3,
      name: "Neha Verma",
      enrolment: "BTECH2023099",
      timing: "11 Nov 2025, 8:00 AM - 9:00 PM",
      reason: "Intercollege competition",
      profile: "https://i.pravatar.cc/150?img=22",
      status: "denied",
    },
  ];

  const filtered = requests.filter((r) => {
    if (activeTab === "queue") return r.status === "pending";
    if (activeTab === "approved") return r.status === "approved";
    if (activeTab === "denied") return r.status === "denied";
  });

  return (
    <div className="mt-6 bg-white rounded-xl border shadow-sm">
      {/* Tabs */}
      <div className="flex border-b px-6 pt-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`mr-6 pb-2 text-sm font-medium transition-all ${
              activeTab === tab.key
                ? "text-black border-b-2 border-black"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search bar */}
      <div className="p-4 flex justify-between items-center border-b bg-gray-50">
        <input
          type="text"
          placeholder="Search student..."
          className="px-3 py-2 border rounded-md w-1/3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
        <button className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-800">
          Add Outpass
        </button>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-5 px-6 py-3 text-sm font-medium text-gray-500 border-b">
        <span>Student</span>
        <span>Enrollment</span>
        <span>Outpass Timing</span>
        <span>Reason</span>
        <span className="text-right">Action</span>
      </div>

      {/* Queue list */}
      <div>
        {filtered.length > 0 ? (
          filtered.map((req) => <OutpassCard key={req.id} {...req} />)
        ) : (
          <div className="text-center text-gray-400 py-10 text-sm">
            No {activeTab} requests found.
          </div>
        )}
      </div>
    </div>
  );
}
