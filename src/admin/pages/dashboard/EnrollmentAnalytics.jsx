import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Activity } from "lucide-react";
import SectionHeading from "./SectionHeading";

export default function EnrollmentAnalytics({ chartData, hasEnrollmentDates }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <SectionHeading icon={Activity} title="Enrollment Analytics" />

      <div className="h-65 w-full">
        {hasEnrollmentDates ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient
                  id="enrollmentGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.01} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E8EEF8"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
              />
              <YAxis
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="enrollments"
                name="Enrollments"
                stroke="#3B82F6"
                strokeWidth={3}
                fill="url(#enrollmentGradient)"
                dot={{
                  fill: "#fff",
                  stroke: "#3B82F6",
                  strokeWidth: 2,
                  r: 4,
                }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center text-center text-sm text-slate-400">
            No enrollment date information available yet.
          </div>
        )}
      </div>
    </div>
  );
}
