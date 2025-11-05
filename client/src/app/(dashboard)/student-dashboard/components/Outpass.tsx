"use client";

import { Plus, MoreVertical, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "../../../../../components/ui/card";
import { Button } from "../../../../../components/ui/button";
import { Badge } from "../../../../../components/ui/badge";

const outpasses = [
  {
    id: 1,
    title: "Weekend Outpass",
    date: "Nov 9 - Nov 11",
    status: "Approved",
    statusColor: "bg-green-100 text-green-700",
  },
  {
    id: 2,
    title: "Medical Outpass",
    date: "Nov 15",
    status: "Pending",
    statusColor: "bg-yellow-100 text-yellow-700",
  },
  {
    id: 3,
    title: "Family Visit",
    date: "Dec 20 - Dec 25",
    status: "Requested",
    statusColor: "bg-blue-100 text-blue-700",
  },
];

export function Outpass() {
  return (
    <Card className="bg-white border-0 shadow-sm" style={{ borderLeft: "4px solid #1E1E1E" }}>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <h3 className="text-sm font-semibold text-gray-900">Outpass</h3>
        <Button size="icon" variant="ghost" className="h-8 w-8">
          <Plus className="w-4 h-4 text-gray-600" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {outpasses.map((pass) => (
            <div
              key={pass.id}
              className="flex items-center justify-between p-3 rounded-lg border"
              style={{ borderColor: "#1E1E1E1A" }}
            >
              <div>
                <p className="text-sm font-medium text-gray-900">{pass.title}</p>
                <p className="text-xs text-gray-500">{pass.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={`text-xs ${pass.statusColor}`} variant="secondary">
                  {pass.status}
                </Badge>
                <Button size="icon" variant="ghost" className="h-6 w-6">
                  <MoreVertical className="w-3 h-3 text-gray-400" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
