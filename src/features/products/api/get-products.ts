import { api } from "@/shared/api/axios"

export async function getProducts() {
  const res = await api.get("/products")
  return res.data
}
