"use client"

import { useState } from "react"

import { PageContainer } from "@/shared/components/layout/page-container"
import { PageHeader } from "@/shared/components/layout/page-header"
import { PageCard } from "@/shared/components/layout/page-card"
import { Can } from "@/shared/components/permission/can"

import { RolesTable } from "../components/roles-table"
import { useRoles } from "../hooks/use-roles"

import { Button } from "@/components/ui/button"

export default function RolesPage() {

  const { data = [], isLoading } = useRoles("")
  const [search, setSearch] = useState("")

  return (
    <PageContainer>

      <PageHeader
        title="Roles"
        description="Manage roles and permissions"
        action={
          <Can permission="roles.create">
            <Button asChild>
              <a href="/roles/create">Add User</a>
            </Button>
          </Can>
        }
      />

      <PageCard>
        <RolesTable
          data={data ?? []}
          loading={isLoading}
        />
      </PageCard>

    </PageContainer>
  )
}