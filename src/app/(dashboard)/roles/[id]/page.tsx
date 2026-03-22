import EditRolePage from "@/features/roles/pages/edit-role-page"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return <EditRolePage id={id} />
}