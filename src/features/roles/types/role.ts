import { Permission } from "@/shared/types/permission"

export interface Role {
  id: string
  name: string
  permissions: Permission[]
}