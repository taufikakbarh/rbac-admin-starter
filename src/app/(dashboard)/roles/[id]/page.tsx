import EditRolePage from "@/features/roles/pages/edit-role-page"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {

  return <EditRolePage />
}