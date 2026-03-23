const fs = require("fs")
const path = require("path")

const moduleName = process.argv[2]

if (!moduleName) {
  console.log("❌ Please provide module name")
  console.log("👉 Example: npm run generate products")
  process.exit(1)
}

const capitalized = capitalize(moduleName)

const basePath = path.join(
  __dirname,
  `../src/features/${moduleName}`
)

// Create folders
const folders = ["api", "components", "hooks", "types", "pages"]

folders.forEach((folder) => {
  fs.mkdirSync(path.join(basePath, folder), { recursive: true })
})

/**
 * TYPES
 */
fs.writeFileSync(
  path.join(basePath, "types", `${moduleName}.ts`),
  `export interface ${capitalized} {
  id: string
  name: string
}
`
)

/**
 * API
 */
fs.writeFileSync(
  path.join(basePath, "api", `get-${moduleName}.ts`),
  `import { api } from "@/shared/api/axios"

export async function get${capitalized}() {
  const res = await api.get("/${moduleName}")
  return res.data
}
`
)

/**
 * HOOK
 */
fs.writeFileSync(
  path.join(basePath, "hooks", `use-${moduleName}.ts`),
  `import { useQuery } from "@tanstack/react-query"
import { get${capitalized} } from "../api/get-${moduleName}"

export function use${capitalized}() {
  return useQuery({
    queryKey: ["${moduleName}"],
    queryFn: get${capitalized},
  })
}
`
)

/**
 * TABLE COMPONENT
 */
fs.writeFileSync(
  path.join(basePath, "components", `${moduleName}-table.tsx`),
  `"use client"

export function ${capitalized}Table() {
  return <div>${capitalized} Table</div>
}
`
)

/**
 * PAGE
 */
fs.writeFileSync(
  path.join(basePath, "pages", `${moduleName}-page.tsx`),
  `"use client"

import { PageContainer } from "@/shared/components/layout/page-container"
import { PageHeader } from "@/shared/components/layout/page-header"
import { ${capitalized}Table } from "../components/${moduleName}-table"
import { use${capitalized} } from "../hooks/use-${moduleName}"

export default function ${capitalized}Page() {

  const { data, isLoading } = use${capitalized}()

  return (
    <PageContainer>

      <PageHeader
        title="${capitalized}"
        description="Manage ${moduleName}"
      />

      <${capitalized}Table />

    </PageContainer>
  )
}
`
)

console.log(`✅ Module "${moduleName}" generated successfully!`)

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}