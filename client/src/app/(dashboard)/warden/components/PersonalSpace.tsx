"use client";

import { Card, CardContent } from "../../../../../components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const performanceData = [
  { name: "Mon", value: 85 },
  { name: "Tue", value: 90 },
  { name: "Wed", value: 78 },
  { name: "Thu", value: 92 },
  { name: "Fri", value: 88 },
  { name: "Sat", value: 95 },
  { name: "Sun", value: 91 },
];

export function PersonalSpace() {
  return (
    <div className="space-y-6">
      <Card className="bg-white border-0 shadow-sm" style={{ borderLeft: "4px solid #1E1E1E" }}>
        <CardContent className="pt-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Weekly Performance</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="0" stroke="#1E1E1E15" vertical={false} />
              <XAxis dataKey="name" stroke="#1E1E1E40" style={{ fontSize: "12px" }} />
              <YAxis stroke="#1E1E1E40" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #1E1E1E20",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="value" fill="#1E1E1E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-white border-0 shadow-sm" style={{ borderLeft: "4px solid #1E1E1E" }}>
        <CardContent className="pt-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Study Hours Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="0" stroke="#1E1E1E15" vertical={false} />
              <XAxis dataKey="name" stroke="#1E1E1E40" style={{ fontSize: "12px" }} />
              <YAxis stroke="#1E1E1E40" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #1E1E1E20",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#1E1E1E"
                dot={{ fill: "#1E1E1E", r: 4 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
