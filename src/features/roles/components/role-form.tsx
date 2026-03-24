"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import { FormLayout } from "@/shared/components/form/form-layout"
import { FormField } from "@/shared/components/form/form-field"

import { PERMISSIONS } from "@/shared/constants/permissions"
import { Role } from "../types/role"

import { createRoleSchema } from "../schemas/create-role-schema"

interface FormValues {
  name: string
  permissions: string[]
}

interface Props {
  role?: Role
  onSubmit: (values: { name: string; permissions: string[] }) => void
  loading?: boolean
  submitLabel?: string
}

export function RoleForm({
  role,
  onSubmit,
  loading,
  submitLabel = "Save Role",
}: Props) {

  const form = useForm<FormValues>({
    resolver: zodResolver(createRoleSchema),
    defaultValues: {
      name: "",
      permissions: [],
    },
  })

  const selectedPermissions = form.watch("permissions")

  function togglePermission(module: string, action: string) {
    const permission = `${module}.${action}`
    const current = form.getValues("permissions")

    const exists = current.includes(permission)

    const updated = exists
      ? current.filter((p) => p !== permission)
      : [...current, permission]

    form.setValue("permissions", updated, {
      shouldValidate: true,
    })
  }

  function isChecked(module: string, action: string) {
    return selectedPermissions?.includes(`${module}.${action}`)
  }

  function handleSubmit(values: FormValues) {
    onSubmit(values)
  }

  const error = form.formState.errors

  useEffect(() => {
    if (!role) return

    form.setValue("name", role.name)
    form.setValue("permissions", role.permissions)
  }, [role])

  return (
    <FormLayout
      onSubmit={form.handleSubmit(handleSubmit)}
    >

      {/* NAME */}
      <FormField 
        label="Role Name"
        error={error.name?.message}>
        <Input
          {...form.register("name")}
          className={error.name ? "border-red-500" : ""}
        />
      </FormField>

      {/* PERMISSIONS */}
      <FormField 
        label="Permissions"
        error={error.permissions?.message}>
        <div className="space-y-4">

          {Object.entries(PERMISSIONS).map(
            ([module, actions]) => (
              <div key={module} className="space-y-2">
                <p className="text-sm font-semibold capitalize">
                  {module}
                </p>

                <div className="flex flex-col gap-2">
                  {actions.map((action) => (
                    <label
                      key={action}
                      className="flex items-center gap-2"
                    >
                      <Checkbox
                        checked={isChecked(module, action)}
                        onCheckedChange={() =>
                          togglePermission(module, action)
                        }
                        disabled={loading}
                      />
                      <span className="text-sm capitalize">
                        {action}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )
          )}

        </div>
      </FormField>

      {/* ACTION */}
      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {submitLabel}
        </Button>
      </div>

    </FormLayout>
  )
}