"use client"

import { PageContainer } from "@/shared/components/layout/page-container"
import { PageHeader } from "@/shared/components/layout/page-header"
import { ProductsTable } from "../components/products-table"
import { useProducts } from "../hooks/use-products"

export default function ProductsPage() {

  const { data, isLoading } = useProducts()

  return (
    <PageContainer>

      <PageHeader
        title="Products"
        description="Manage products"
      />

      <ProductsTable />

    </PageContainer>
  )
}
