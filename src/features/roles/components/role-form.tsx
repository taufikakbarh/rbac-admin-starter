"use client"

import { useEffect } from "react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { useCreateRole } from "../hooks/use-create-role"
import { useUpdateRole } from "../hooks/use-update-role"

import { PERMISSIONS, flattenPermissions } from "@/shared/constants/permissions"

import { Role } from "../types/role"

interface FormValues {
  name: string
  permissions: Record<string, string[]>
}

interface Props {
  role?: Role
}

export function RoleForm({
  role
}: Props) {
  const updateRole = useUpdateRole()

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      permissions: {},
    },
  })

  function mapPermissionsToForm(permissions: string[]) {
    const result: Record<string, string[]> = {}

    permissions.forEach((perm) => {
      const [module, action] = perm.split(".")

      if (!result[module]) result[module] = []

      result[module].push(action)
    })

    return result
  }

  const router = useRouter()
  const createRole = useCreateRole()

  function togglePermission(module: string, action: string) {
    const current = permissions || {}

    const modulePermissions = current[module] || []

    const exists = modulePermissions.includes(action)

    const updated = exists
      ? modulePermissions.filter((a) => a !== action)
      : [...modulePermissions, action]

    form.setValue("permissions", {
      ...current,
      [module]: updated,
    })
  }

  function isChecked(module: string, action: string) {
    return permissions?.[module]?.includes(action)
  }

  function onSubmit(values: FormValues) {
    const payload = {
      name: values.name,
      permissions: flattenPermissions(values.permissions),
    }

    if (role?.id) {
      updateRole.mutate(
        { id: role.id, data: payload },
        {
          onSuccess: () => {
            router.push("/roles")
          },
        }
      )
    } else {
      createRole.mutate(payload, {
        onSuccess: () => {
          router.push("/roles")
        },
      })
    }
  }

  const permissions = form.watch("permissions")

  useEffect(() => {
    if (!role) return

    form.setValue("name", role.name)

    form.setValue(
      "permissions",
      mapPermissionsToForm(role.permissions)
    )
  }, [role])

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6 max-w-md"
    >

      {/* NAME */}
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Role Name
        </label>
        <Input {...form.register("name")} />
      </div>

      {/* PERMISSIONS */}
      <div className="space-y-4">

        <label className="text-sm font-medium">
          Permissions
        </label>

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

      <Button type="submit">
        Save Role
      </Button>

    </form>
  )
}