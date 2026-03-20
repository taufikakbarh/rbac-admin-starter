"use client"

import { useRouter, useSearchParams } from "next/navigation"

import { PageContainer } from "@/shared/components/layout/page-container"
import { PageHeader } from "@/shared/components/layout/page-header"
import { PageCard } from "@/shared/components/layout/page-card"
import { DataTableToolbar } from "@/shared/components/data-display/data-table-toolbar"
import { DataTablePagination } from "@/shared/components/data-display/data-table-pagination"
import { Can } from "@/shared/components/permission/can"

import { UsersTable } from "../components/users-table"
import { useUsers } from "../hooks/use-users"

import { Button } from "@/components/ui/button"

export default function UsersPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get("page") ?? 1)
  const limit = Number(searchParams.get("limit") ?? 10)
  const search = searchParams.get("search") ?? ""
  const role = searchParams.get("role") ?? ""

  const { data, isLoading } = useUsers(
    page,
    limit,
    search,
    role
  )

  function setPage(newPage: number) {
    const params = new URLSearchParams(searchParams)

    params.set("page", String(newPage))

    router.push(`/users?${params.toString()}`)
  }

  function setSearch(value: string) {
    const params = new URLSearchParams(searchParams)

    params.set("search", value)
    params.set("page", "1")

    router.push(`/users?${params.toString()}`)
  }

  function setRole(value: string) {
    const params = new URLSearchParams(searchParams)

    if (value !== "all") params.set("role", value)
    else params.delete("role")

    params.set("page", "1")

    router.push(`/users?${params.toString()}`)
  }

  return (
    <PageContainer>

      <PageHeader
        title="Users"
        description="Manage system users"
        action={
          <Can permission="users.create">
            <Button asChild>
              <a href="/users/create">Add User</a>
            </Button>
          </Can>
        }
      />

      <PageCard>

        <UsersTable
          data={data?.data ?? []}
          loading={isLoading}
          renderToolbar={(table) => (
            <DataTableToolbar
              table={table}
              search={search}
              role={role}
              onSearchChange={setSearch}
              onRoleChange={setRole}
            />
          )}
        />

        <DataTablePagination
          page={page}
          limit={limit}
          total={data?.total ?? 0}
          onPageChange={setPage}
        />

      </PageCard>

    </PageContainer>
  )
}