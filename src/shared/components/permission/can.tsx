"use client"

import { Permission } from "@/shared/types/permission"
import { usePermission } from "@/shared/hooks/use-permission"

interface Props {
  permission: Permission
  children: React.ReactNode
}

export function Can({ permission, children }: Props) {

  const allowed = usePermission(permission)

  if (!allowed) return null

  return <>{children}</>
}