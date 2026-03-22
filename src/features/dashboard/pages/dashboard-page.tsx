"use client"

import { PageContainer } from "@/shared/components/layout/page-container"
import { PageHeader } from "@/shared/components/layout/page-header"
import { PageCard } from "@/shared/components/layout/page-card"

import { useUsers } from "@/features/users/hooks/use-users"
import { useAllRoles } from "@/features/roles/hooks/use-all-roles"

import { DashboardStats } from "../components/dashboard-stats"
import { DashboardRoleDistribution } from "../components/dashboard-role-distribution"
import { DashboardRecentUsers } from "../components/dashboard-recent-users"
import { DashboardSkeleton } from "@/shared/components/skeletons/dashboard-skeleton"
import { DashboardUsersByRole } from "../components/dashboard-users-by-role"
import { ChartSkeleton } from "@/shared/components/skeletons/chart-skeleton"
import { EmptyState } from "@/shared/components/empty-state"

export default function DashboardPage() {

  const { data: usersData, isLoading } = useUsers(1, 100, "", "")
  const users = usersData?.data ?? []

  const { data: rolesData } = useAllRoles()
  const roles = rolesData ?? []

  if (isLoading) {
    return (
      <>
        <ChartSkeleton />
        <DashboardSkeleton />
      </>
    )
  }

  if (users.length === 0) {
    return (
      <EmptyState
        title="No users yet"
        description="Create your first user to get started"
      />
    )
  }

  return (
    <PageContainer>

      <PageHeader
        title="Dashboard"
        description="Overview of your system"
      />

      {users.length === 0 ? (
        <PageCard>
          <EmptyState
            title="No users yet"
            description="Create your first user to get started"
          />
        </PageCard>
      ):(
        <>
          {/* STATS */}
          <DashboardStats
            totalUsers={usersData?.total ?? 0}
            totalRoles={roles.length}
          />

          {/* CHART */}
          <DashboardUsersByRole users={users} />

          {/* INSIGHTS */}
          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <DashboardRoleDistribution users={users} />
            <DashboardRecentUsers users={users} />
          </div>
        </>
      )}

    </PageContainer>
  )
}