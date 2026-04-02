"use client"

import { createContext, useContext } from "react"
import { useAllRoles } from "@/features/roles/hooks/use-all-roles"
import { Permission } from "../constants/permissions"
import { useAuth } from "./auth-provider"
import { useState } from "react"

// 🔥 DEMO FEATURE — safe to remove
const ENABLE_ROLE_PREVIEW = true

interface PermissionContextValue {
  permissions: Permission[]

  previewRole: string | null
  setPreviewRole: (role: string | null) => void
}

const PermissionContext = createContext<PermissionContextValue>({
  permissions: [],
  previewRole: null,
  setPreviewRole: () => {},
})

interface Props {
  children: React.ReactNode
}

export function PermissionProvider({ children }: Props) {
  const { user } = useAuth()
  const { data: roles = [] } = useAllRoles()
  const [previewRole, setPreviewRole] = useState<string | null>(null)

  const activeRoleName = ENABLE_ROLE_PREVIEW
    ? previewRole ?? user?.role
    : user?.role

  const role = roles.find((r) => r.name === activeRoleName)

  const permissions = role?.permissions || []

  return (
    <PermissionContext.Provider
      value={{
        permissions,
        previewRole,
        setPreviewRole,
      }}
    >
      {children}
    </PermissionContext.Provider>
  )
}

export function usePermissionContext() {
  return useContext(PermissionContext)
}