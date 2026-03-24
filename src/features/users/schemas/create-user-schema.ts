import { z } from "zod"

export const createUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required"),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address"),

  role: z
    .string()
    .min(1, "Role is required"),
})

export type CreateUserInput = z.infer<typeof createUserSchema>