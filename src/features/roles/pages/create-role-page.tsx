"use client"

import { PageContainer } from "@/shared/components/layout/page-container"
import { PageHeader } from "@/shared/components/layout/page-header"
import { PageCard } from "@/shared/components/layout/page-card"

import { RoleForm } from "../components/role-form"

export default function CreateRolePage() {

  return (
    <PageContainer>

      <PageHeader
        title="Create Role"
        description="Add a new role"
      />

      <PageCard>
        <RoleForm />
      </PageCard>

    </PageContainer>
  )
}