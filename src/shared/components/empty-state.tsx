import { ReactNode } from "react"

interface Props {
  title: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
}

export function EmptyState({
  title,
  description,
  icon,
  action,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">

      {icon && (
        <div className="mb-4 text-muted-foreground">
          {icon}
        </div>
      )}

      <h3 className="text-lg font-medium">
        {title}
      </h3>

      {description && (
        <p className="text-sm text-muted-foreground mt-1">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}

    </div>
  )
}