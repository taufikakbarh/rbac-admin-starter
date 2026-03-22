interface User {
  id: string
  name: string
  email: string
}

interface Props {
  users: User[]
}

export function DashboardRecentUsers({ users }: Props) {

  const recent = users.slice(0, 5)

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-sm font-medium mb-4">
        Recent Users
      </h3>

      <div className="space-y-3">
        {recent.map((user) => (
          <div key={user.id}>
            <p className="text-sm font-medium">
              {user.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}