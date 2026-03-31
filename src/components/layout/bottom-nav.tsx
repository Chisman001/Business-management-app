"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/products", label: "Products", icon: Package },
  { href: "/orders", label: "Orders", icon: ShoppingCart },
  { href: "/customers", label: "Customers", icon: Users },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-stretch border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 md:hidden">
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-1 text-xs font-medium transition-colors duration-200",
              isActive
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300"
            )}
          >
            <Icon size={20} />
            <span>{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
