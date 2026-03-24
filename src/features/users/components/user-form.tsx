"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormLayout } from "@/shared/components/form/form-layout"
import { FormField } from "@/shared/components/form/form-field"
import { Controller } from "react-hook-form"

import {
  createUserSchema,
  CreateUserInput,
} from "../schemas/create-user-schema"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useAllRoles } from "@/features/roles/hooks/use-all-roles"

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

  const error = form.formState.errors

  const { data: roles = [] } = useAllRoles()

  return (
    <FormLayout onSubmit={form.handleSubmit(onSubmit)}>

      <FormField
        label="Name"
        error={error.name?.message}
      >
        <Input
          {...form.register("name")}
          className={error.name ? "border-red-500" : ""}
        />
      </FormField>

      <FormField
        label="Email"
        error={error.email?.message}
      >
        <Input
          {...form.register("email")}
          className={error.email ? "border-red-500" : ""}
        />
      </FormField>

      <FormField
        label="Role"
        error={error.role?.message}
      >
         <Controller
          control={form.control}
          name="role"
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={loading}
            >
              <SelectTrigger 
                className={`w-full ${
                  error.role ? "border-red-500" : ""
                }`}
              >
                <SelectValue placeholder="Select role" />
              </SelectTrigger>

              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.name}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </FormField>

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {submitLabel}
        </Button>
      </div>

    </FormLayout>
  )
}