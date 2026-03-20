"use client"

import { useRouter, useSearchParams } from "next/navigation"

import { PageContainer } from "@/shared/components/layout/page-container"
import { PageHeader } from "@/shared/components/layout/page-header"
import { PageCard } from "@/shared/components/layout/page-card"
import { DataTableToolbar } from "@/shared/components/data-display/data-table-toolbar"
import { DataTablePagination } from "@/shared/components/data-display/data-table-pagination"
import { Can } from "@/shared/components/permission/can"

import { RolesTable } from "../components/roles-table"
import { useRoles } from "../hooks/use-roles"

import { Button } from "@/components/ui/button"

export default function RolesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get("page") ?? 1)
  const limit = Number(searchParams.get("limit") ?? 10)
  const search = searchParams.get("search") ?? ""

  const { data, isLoading } = useRoles(
    page,
    limit,
    search
  )

  function setPage(newPage: number) {
    const params = new URLSearchParams(searchParams)
    params.set("page", String(newPage))
    router.push(`/roles?${params.toString()}`)
  }

  function setSearch(value: string) {
    const params = new URLSearchParams(searchParams)
    params.set("search", value)
    params.set("page", "1")
    router.push(`/roles?${params.toString()}`)
  }

  return (
    <PageContainer>

      <PageHeader
        title="Roles"
        description="Manage system roles"
        action={
          <Can permission="roles.create">
            <Button asChild>
              <a href="/roles/create">Add Role</a>
            </Button>
          </Can>
        }
      />

      <PageCard>

        <RolesTable
          data={data?.data ?? []}
          loading={isLoading}
          renderToolbar={(table) => (
            <DataTableToolbar
              table={table}
              search={search}
              onSearchChange={setSearch}
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