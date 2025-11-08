"use client";

import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader } from "../../../../../components/ui/card";
import { Badge } from "../../../../../components/ui/badge";

const holidays = [
  {
    name: "Christmas",
    date: "Dec 25, 2024",
    daysUntil: 53,
  },
  {
    name: "New Year",
    date: "Jan 1, 2025",
    daysUntil: 60,
  },
  {
    name: "Summer Break",
    date: "Jun 1, 2025",
    daysUntil: 211,
  },
];

export function Holiday() {
  return (
    <Card className="bg-white border-0 shadow-sm" style={{ borderLeft: "4px solid #1E1E1E" }}>
      <CardHeader className="pb-3">
        <h3 className="text-sm font-semibold text-gray-900">Holidays</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {holidays.map((holiday, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{holiday.name}</p>
                  <p className="text-xs text-gray-500">{holiday.date}</p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs bg-white">
                {holiday.daysUntil}d
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
