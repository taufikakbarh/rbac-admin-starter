export const PERMISSIONS = {
  users: ["view", "create", "update", "delete"],
  roles: ["view", "create", "update", "delete"],
} as const

export type PermissionModule = keyof typeof PERMISSIONS

export type PermissionAction<
  T extends PermissionModule
> = typeof PERMISSIONS[T][number]

export type Permission =
  {
    [K in PermissionModule]: `${K}.${PermissionAction<K>}`
  }[PermissionModule]

export function flattenPermissions(
  values: Partial<Record<PermissionModule, string[]>>
): Permission[] {
  return Object.entries(values).flatMap(
    ([module, actions]) =>
      (actions || []).map(
        (action) =>
          `${module}.${action}` as Permission
      )
  )
}
