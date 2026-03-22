import { Users, UserRoundKey } from "lucide-react"

interface Props {
  totalUsers: number
  totalRoles: number
}

export function DashboardStats({
  totalUsers,
  totalRoles,
}: Props) {

  return (
    <div className="grid gap-4 md:grid-cols-2">

      {/* USERS */}
      <div className="p-4 border rounded-lg flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Total Users
          </p>
          <p className="text-2xl font-semibold">
            {totalUsers}
          </p>
        </div>

        <Users className="w-6 h-6 text-muted-foreground" />
      </div>

      {/* ROLES */}
      <div className="p-4 border rounded-lg flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Total Roles
          </p>
          <p className="text-2xl font-semibold">
            {totalRoles}
          </p>
        </div>

        <UserRoundKey className="w-6 h-6 text-muted-foreground" />
      </div>

    </div>
  )
}