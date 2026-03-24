import { api } from "@/shared/api/axios"
import { Role } from "../types/role"
import { PaginatedResponse } from "@/shared/types/pagination"

interface Params {
  page: number
  limit: number
  search?: string
}

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

export async function getRoles({
  page,
  limit,
  search,
}: Params): Promise<PaginatedResponse<Role>> {

  const res = await api.get<Role[]>("/roles")

  let data = res.data

  // 🔍 search (client-side)
  if (search) {
    data = data.filter((r) =>
      r.name.toLowerCase().includes(search.toLowerCase())
    )
  }

  // 📄 pagination (client-side)
  const start = (page - 1) * limit
  const paginated = data.slice(start, start + limit)

  return {
    data: paginated,
    total: data.length,
    page,
    limit,
  }
}