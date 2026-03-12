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

  const res = await api.get<JsonServerResponse<User>>("/users", {
    params: {
      _page: page,
      _per_page: limit,
      name: search || undefined,
      role: role || undefined,
    },
  })

  return {
    data: res.data.data,
    total: res.data.items,
    page,
    limit,
  }
}