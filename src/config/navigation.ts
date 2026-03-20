import { LucideIcon, LayoutDashboard, Users, Settings, UserRoundKey } from "lucide-react"
import { Permission } from "@/shared/constants/permissions"

export interface NavItem {
  title: string
  href: string
  icon: LucideIcon
  permission?: Permission
}

export const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/users",
    icon: Users,
    permission: "users.view",
  },
  {
    title: "Roles",
    href: "/roles",
    icon: UserRoundKey,
    permission: "roles.view",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
] 
