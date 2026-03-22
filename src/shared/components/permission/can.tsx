"use client"

import { Permission } from "@/shared/constants/permissions"
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