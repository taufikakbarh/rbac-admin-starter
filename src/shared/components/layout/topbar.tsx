import { ThemeToggle } from "./theme-toggle"

export function Topbar() {
  return (
    <header className="h-14 border-b flex items-center px-6">
      <ThemeToggle />
    </header>
  )
}