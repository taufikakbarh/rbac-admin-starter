import { api } from "@/shared/api/axios"
import { PaginatedResponse } from "@/shared/types/pagination"
import { User } from "../types/user"

interface Params {
  page: number
  limit: number
  search?: string
  role?: string
}

interface JsonServerResponse<T> {
  first: number
  prev: number | null
  next: number | null
  last: number
  pages: number
  items: number
  data: T[]
}

export async function getUsers({
  page,
  limit,
  search,
  role,
}: Params): Promise<PaginatedResponse<User>> {

  const res = await api.get<User[]>("/users")

  let data = res.data

  // 🔍 search
  if (search) {
    data = data.filter((u) =>
      u.name.toLowerCase().includes(search.toLowerCase())
    )
  }

  // 🎭 role filter
  if (role) {
    data = data.filter((u) => u.role === role)
  }

  // 📄 pagination (manual)
  const start = (page - 1) * limit
  const paginated = data.slice(start, start + limit)

  return {
    data: paginated,
    total: data.length,
    page,
    limit,
  }
}