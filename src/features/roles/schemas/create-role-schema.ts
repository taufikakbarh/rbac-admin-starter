import { z } from "zod"

export const createRoleSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Role name is required"),

  permissions: z
    .array(z.string())
    .min(1, "Select at least one permission"),
})

export type CreateRoleInput = z.infer<typeof createRoleSchema>