"use client"

import { usePermissionContext } from "@/shared/providers/permission-provider"
import { useAllRoles } from "@/features/roles/hooks/use-all-roles"

import { Button } from "@/components/ui/button"

export function RolePreviewSwitcher() {
  const { previewRole, setPreviewRole } = usePermissionContext()
  const { data: roles = [] } = useAllRoles()

  if (!roles.length) return null

  return (
    <div className="flex items-center gap-2">
      <p className="text-sm text-muted-foreground">Preview as: </p>

      {roles.map((role) => (
        <Button
          key={role.id}
          size="sm"
          variant={
            previewRole === role.name ? "default" : "outline"
          }
          onClick={() => setPreviewRole(role.name)}
        >
          {role.name}
        </Button>
      ))}

      {previewRole && (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setPreviewRole(null)}
        >
          Exit Preview
        </Button>
      )}

    </div>
  )
}