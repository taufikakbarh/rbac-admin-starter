import { ReactNode } from "react"

interface Props {
  label?: string
  error?: string
  children: ReactNode
}

export function FormField({
  label,
  error,
  children,
}: Props) {
  return (
    <div className="space-y-2">

      {label && (
        <label className="text-sm font-medium">
          {label}
        </label>
      )}

      {children}

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

    </div>
  )
}