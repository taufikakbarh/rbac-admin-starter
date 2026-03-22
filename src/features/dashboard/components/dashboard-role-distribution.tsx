interface User {
  id: string
  name: string
  role: string
}

interface Props {
  users: User[]
}

export function DashboardRoleDistribution({ users }: Props) {

  const counts = users.reduce<Record<string, number>>((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1
    return acc
  }, {})

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-sm font-medium mb-4">
        Users by Role
      </h3>

      <div className="space-y-2">
        {Object.entries(counts).map(([role, count]) => (
          <div
            key={role}
            className="flex justify-between text-sm"
          >
            <span className="text-muted-foreground">
              {role}
            </span>
            <span className="font-medium">
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}