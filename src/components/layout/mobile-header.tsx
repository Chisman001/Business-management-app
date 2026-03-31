"use client"

import { Package } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

export function MobileHeader() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-950 md:hidden">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
          <Package size={16} />
        </div>
        <span className="text-base font-bold text-slate-900 dark:text-slate-100">
          TextileHub
        </span>
      </div>
      <ThemeToggle />
    </header>
  )
}
