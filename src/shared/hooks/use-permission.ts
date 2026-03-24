import { Permission } from "../constants/permissions"
import { usePermissionContext } from "@/shared/providers/permission-provider"

export function usePermission(permission: Permission) {

  const { permissions } = usePermissionContext()

  return permissions.includes(permission)
}