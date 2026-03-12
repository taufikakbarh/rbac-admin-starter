"use client"

import { useRouter } from "next/navigation"

import { PageContainer } from "@/shared/components/layout/page-container"
import { PageHeader } from "@/shared/components/layout/page-header"

import { UserForm } from "../components/user-form"
import { useCreateUser } from "../hooks/use-create-user"

export default function CreateUserPage() {

  const router = useRouter()
  const createUser = useCreateUser()

  function handleSubmit(values: any) {
    createUser.mutate(values, {
      onSuccess: () => {
        router.push("/users")
      },
    })
  }

  return (
    <PageContainer>

      <PageHeader
        title="Create User"
        description="Add a new user"
      />

      <UserForm
        onSubmit={handleSubmit}
        loading={createUser.isPending}
        submitLabel="Create User"
      />

    </PageContainer>
  )
}