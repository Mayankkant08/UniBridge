"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader } from "../../../../../components/ui/card";

const attendanceData = [
  { name: "Present", value: 72, color: "#10b981" },
  { name: "Absent", value: 8, color: "#ef4444" },
];

export function AttendanceChart() {
  const totalClasses = 80;
  const attendancePercentage = Math.round((72 / totalClasses) * 100);

  return (
    <Card className="bg-white border-0 shadow-sm" style={{ borderLeft: "4px solid #1E1E1E" }}>
      <CardHeader className="pb-2">
        <h3 className="text-sm font-semibold text-gray-900">Attendance</h3>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="w-32 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {attendanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-2xl font-bold text-gray-900">{attendancePercentage}%</p>
              <p className="text-xs text-gray-500">Attendance Rate</p>
            </div>
            <div className="space-y-2">
              {attendanceData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-xs text-gray-600">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
