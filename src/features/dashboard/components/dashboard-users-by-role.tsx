"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface User {
  id: string
  role: string
}

interface Props {
  users: User[]
}

export function DashboardUsersByRole({ users }: Props) {

  const roleMap: Record<string, number> = {}

  users.forEach((user) => {
    roleMap[user.role] = (roleMap[user.role] || 0) + 1
  })

  const data = Object.entries(roleMap).map(([role, count]) => ({
    role,
    count,
  }))

  return (
    <div className="p-6 border rounded-lg">
      <div className="mb-4">
        <h3 className="text-base font-semibold">
          Users by Role
        </h3>
        <p className="text-sm text-muted-foreground">
          Distribution of users across roles
        </p>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data}
            margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <XAxis
              dataKey="role"
              tick={{ fill: "var(--muted-foreground)" }}
            />

            <YAxis
              tick={{ fill: "var(--muted-foreground)" }}
            />
            <Tooltip
              cursor={false}
              contentStyle={{
                backgroundColor: "var(--background)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "var(--foreground)" }}
            />
            <Bar 
              dataKey="count" 
              fill="var(--chart-2)"
              radius={[6, 6, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}