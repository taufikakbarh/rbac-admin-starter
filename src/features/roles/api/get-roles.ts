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

  const res = await api.get<JsonServerResponse<Role>>("/roles", {
    params: {
      _page: page,
      _per_page: limit,
      name: search || undefined,
    },
  })

  return {
    data: res.data.data,
    total: res.data.items,
    page,
    limit,
  }
}