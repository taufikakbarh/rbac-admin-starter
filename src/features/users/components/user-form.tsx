"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormField } from "@/shared/components/form/form-field"

import {
  createUserSchema,
  CreateUserInput,
} from "../schemas/create-user-schema"

interface Props {
  defaultValues?: CreateUserInput
  onSubmit: (values: CreateUserInput) => void
  loading?: boolean
  submitLabel?: string
}

export function UserForm({
  defaultValues,
  onSubmit,
  loading,
  submitLabel = "Save",
}: Props) {

  const form = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    defaultValues: defaultValues ?? {
      name: "",
      email: "",
      role: "",
    },
  })

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 max-w-md"
    >

      <FormField
        label="Name"
        error={form.formState.errors.name?.message}
        >
        <Input {...form.register("name")} />
      </FormField>

      <FormField
        label="Email"
        error={form.formState.errors.email?.message}
      >
        <Input {...form.register("email")} />
      </FormField>

      <FormField
        label="Role"
        error={form.formState.errors.role?.message}
      >
        <Input {...form.register("role")} />
      </FormField>

      <Button type="submit" disabled={loading}>
        {submitLabel}
      </Button>

    </form>
  )
}