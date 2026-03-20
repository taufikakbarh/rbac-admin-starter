"use client"

import { createContext, useContext } from "react"
import { useAllRoles } from "@/features/roles/hooks/use-all-roles"
import { Permission } from "../constants/permissions"
import { useAuth } from "./auth-provider"

interface PermissionContextValue {
  permissions: Permission[]
}

const PermissionContext = createContext<PermissionContextValue>({
  permissions: [],
})

interface Props {
  children: React.ReactNode
}

export function PermissionProvider({ children }: Props) {

  const { user } = useAuth()
  const { data: roles = [] } = useAllRoles()

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