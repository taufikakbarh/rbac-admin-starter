import { Permission } from "@/shared/constants/permissions"

export interface Role {
  id: string
  name: string
  permissions: Permission[]
}