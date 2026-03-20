"use client"

import { createContext, useContext } from "react"
import { useRoles } from "@/features/roles/hooks/use-roles"
import { Permission } from "../types/permission"
import { useAuth } from "./auth-provider"

interface PermissionContextValue {
  permissions: Permission[]
}

const PermissionContext = createContext<PermissionContextValue>({
  permissions: [],
})

export function PermissionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()
  const { data: roles = [] } = useRoles()

  const role = roles.find((r) => r.name === user?.role)

  const permissions = role?.permissions || []

  return (
    <PermissionContext.Provider value={{ permissions }}>
      {children}
    </PermissionContext.Provider>
  )
}

export function usePermissionContext() {
  return useContext(PermissionContext)
}