"use client"

import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

import { PageContainer } from "@/shared/components/layout/page-container"
import { PageHeader } from "@/shared/components/layout/page-header"
import { PageCard } from "@/shared/components/layout/page-card"
import { DataTableToolbar } from "@/shared/components/data-display/data-table-toolbar"
import { DataTablePagination } from "@/shared/components/data-display/data-table-pagination"
import { Can } from "@/shared/components/permission/can"

import { RolesTable } from "../components/roles-table"
import { useRoles } from "../hooks/use-roles"
import { useDeleteRoles } from "../hooks/use-delete-roles"

import { Button } from "@/components/ui/button"
import { EmptyState } from "@/shared/components/empty-state"
import { Inbox } from "lucide-react"

export default function RolesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const deleteRolesMutation = useDeleteRoles()

  const page = Number(searchParams.get("page") ?? 1)
  const limit = Number(searchParams.get("limit") ?? 10)
  const search = searchParams.get("search") ?? ""

  const { data, isLoading, isFetching } = useRoles(
    page,
    limit,
    search
  )
  
  const hasFilters = !!search
  const isSystemEmpty = (data?.total ?? 0) === 0 && !hasFilters

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
              <Link href="/roles/create">Add Role</Link>
            </Button>
          </Can>
        }
      />

      <PageCard>
        {isSystemEmpty ? (
          <EmptyState
            title="No roles yet"
            description="Start by adding your first role"
            icon={<Inbox className="w-6 h-6" />}
            action={
              <Button asChild>
                <Link href="/roles/create">Add Role</Link>
              </Button>
            }
          />
        ):(
          <>
            <RolesTable
              data={data?.data ?? []}
              loading={isLoading || isFetching}
              renderToolbar={(table) => (
                <DataTableToolbar
                  table={table}
                  search={search}
                  onSearchChange={setSearch}
                  onBulkDelete={(ids) => deleteRolesMutation.mutate(ids)}
                  deletePermission="roles.delete"
                  entityName="roles"
                />
              )}
            />

            {(data?.total ?? 0) > 0 && (
              <DataTablePagination
                page={page}
                limit={limit}
                total={data?.total ?? 0}
                onPageChange={setPage}
              />
            )}
          </>
        )}

      </PageCard>

    </PageContainer>
  )
}