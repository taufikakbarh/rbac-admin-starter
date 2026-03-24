"use client"

interface Props {
  title?: string
  description?: string
  children: React.ReactNode
  onSubmit: (e: React.FormEvent) => void
  className?: string
}

export function FormLayout({
  title,
  description,
  children,
  onSubmit,
  className,
}: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className={`space-y-6 max-w-md ${className ?? ""}`}
    >

      {(title || description) && (
        <div>
          {title && (
            <h2 className="text-lg font-semibold">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      )}

      {children}

    </form>
  )
}