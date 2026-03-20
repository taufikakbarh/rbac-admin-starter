"use client"

import { useParams } from "next/navigation"

import { PageContainer } from "@/shared/components/layout/page-container"
import { PageHeader } from "@/shared/components/layout/page-header"
import { PageCard } from "@/shared/components/layout/page-card"

import { RoleForm } from "../components/role-form"
import { useRole } from "../hooks/use-role"

export default function EditRolePage() {

  const params = useParams()
  const id = params.id as string

  const { data, isLoading } = useRole(id)

  if (isLoading) return <div>Loading...</div>

  return (
    <PageContainer>

      <PageHeader
        title="Edit Role"
        description="Update role permissions"
      />

      <PageCard>
        <RoleForm role={data} />
      </PageCard>

    </PageContainer>
  )
}