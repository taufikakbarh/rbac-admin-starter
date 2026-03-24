"use client"

import { useRouter } from "next/navigation"

import { PageContainer } from "@/shared/components/layout/page-container"
import { PageHeader } from "@/shared/components/layout/page-header"
import { PageCard } from "@/shared/components/layout/page-card"

import { UserForm } from "../components/user-form"
import { useUser } from "../hooks/use-user"
import { useUpdateUser } from "../hooks/use-update-user"
import { mutateWithToast } from "@/shared/utils/mutate-with-toast"

interface Props {
  id: string
}

export default function EditUserPage({ id }: Props) {
  const router = useRouter()

  const { data, isLoading } = useUser(id)
  const updateUser = useUpdateUser()

  if (isLoading ) return <div>Loading...</div>

  if (!data) return <div>user not found</div>

  function handleSubmit(values: any) {
    mutateWithToast({
      mutation: updateUser,
      variables: { id, data: values },
      loadingMessage: "Updating user...",
      successMessage: "User updated successfully",
      errorMessage: "Failed to update user",
      onSuccess: () => {
        router.push("/users")
      },
    })
  }

  return (
    <PageContainer>

      <PageHeader
        title="Edit User"
        description="Update user information"
      />

      <PageCard>
        <UserForm
          defaultValues={data}
          onSubmit={handleSubmit}
          loading={updateUser.isPending}
          submitLabel="Update User"
        />
      </PageCard>

    </PageContainer>
  )
}