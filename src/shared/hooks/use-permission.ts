import { Permission } from "@/shared/types/permission"
import { usePermissionContext } from "@/shared/providers/permission-provider"

export function usePermission(permission: Permission) {

  const { permissions } = usePermissionContext()

  return permissions.includes(permission)
}