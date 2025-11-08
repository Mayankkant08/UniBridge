"use client";

import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader } from "../../../../../components/ui/card";

export function GPA() {
  return (
    <Card className="bg-white border-0 shadow-sm" style={{ borderLeft: "4px solid #1E1E1E" }}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">GPA</h3>
          <TrendingUp className="w-4 h-4 text-gray-400" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">4.7</span>
          <span className="text-xs text-gray-500">/5.0</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <p className="text-xs text-gray-500">High</p>
        </div>
        <p className="text-xs text-gray-400 mt-2">Performance is up 4% since last semester</p>
      </CardContent>
    </Card>
  );
}
