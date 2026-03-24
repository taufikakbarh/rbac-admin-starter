"use client"

import { useParams, useRouter } from "next/navigation"

import { PageContainer } from "@/shared/components/layout/page-container"
import { PageHeader } from "@/shared/components/layout/page-header"
import { PageCard } from "@/shared/components/layout/page-card"

import { RoleForm } from "../components/role-form"
import { useRole } from "../hooks/use-role"
import { useUpdateRole } from "../hooks/use-update-role"

import { mutateWithToast } from "@/shared/utils/mutate-with-toast"

export default function EditRolePage() {

  const params = useParams()
  const router = useRouter()

  const id = params.id as string

  const { data, isLoading } = useRole(id)
  const updateRole = useUpdateRole()

  function handleSubmit(values: any) {
    mutateWithToast({
      mutation: updateRole,
      variables: { id, data: values },
      loadingMessage: "Updating role...",
      successMessage: "Role updated successfully",
      errorMessage: "Failed to update role",
      onSuccess: () => {
        router.push("/roles")
      },
    })
  }

  if (isLoading) return <div>Loading...</div>

  if (!data) return <div>Role not found</div>

  return (
    <PageContainer>

      <PageHeader
        title="Edit Role"
        description="Update role permissions"
      />

      <PageCard>
        <RoleForm
          role={data}
          onSubmit={handleSubmit}
          loading={updateRole.isPending}
          submitLabel="Update Role"
        />
      </PageCard>

    </PageContainer>
  )
}