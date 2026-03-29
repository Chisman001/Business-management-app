"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useCallback, useRef, useTransition } from "react"
import { Search, Filter } from "lucide-react"
import { PRODUCT_CATEGORIES } from "@/lib/types"
import { cn } from "@/lib/utils"

export function ProductsToolbar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()

  const currentSearch = searchParams.get("search") ?? ""
  const currentCategory = searchParams.get("category") ?? ""
  const debounceTimer = useRef<ReturnType<typeof setTimeout>>()

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`)
      })
    },
    [pathname, router, searchParams]
  )

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    clearTimeout(debounceTimer.current)
    debounceTimer.current = setTimeout(() => {
      updateParams("search", e.target.value)
    }, 350)
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="search"
          placeholder="Search products…"
          defaultValue={currentSearch}
          onChange={handleSearch}
          className={cn(
            "w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm",
            "text-slate-900 outline-none transition-colors placeholder:text-slate-400",
            "focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20",
            "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          )}
        />
      </div>

      <div className="relative">
        <Filter
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <select
          value={currentCategory}
          onChange={(e) => updateParams("category", e.target.value)}
          className={cn(
            "appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-sm",
            "text-slate-900 outline-none transition-colors",
            "focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20",
            "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          )}
        >
          <option value="">All Categories</option>
          {PRODUCT_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
