"use client"

import { useRouter } from "next/navigation"

import { PageContainer } from "@/shared/components/layout/page-container"
import { PageHeader } from "@/shared/components/layout/page-header"
import { PageCard } from "@/shared/components/layout/page-card"

import { RoleForm } from "../components/role-form"
import { useCreateRole } from "../hooks/use-create-role"

import { mutateWithToast } from "@/shared/utils/mutate-with-toast"

export default function CreateRolePage() {

  const router = useRouter()
  const createRole = useCreateRole()

  function handleSubmit(values: any) {
    mutateWithToast({
      mutation: createRole,
      variables: values,
      loadingMessage: "Creating role...",
      successMessage: "Role created successfully",
      errorMessage: "Failed to create role",
      onSuccess: () => {
        router.push("/roles")
      },
    })
  }

  return (
    <PageContainer>

      <PageHeader
        title="Create Role"
        description="Add a new role"
      />

      <PageCard>
        <RoleForm
          onSubmit={handleSubmit}
          loading={createRole.isPending}
          submitLabel="Create Role"
        />
      </PageCard>

    </PageContainer>
  )
}