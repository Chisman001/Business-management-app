import { cn } from "@/lib/utils"
import { type LucideIcon } from "lucide-react"

type StatCardProps = {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  colorClass?: string
}

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  colorClass = "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400",
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200 bg-white p-4 md:p-6",
        "shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md",
        "dark:border-slate-800 dark:bg-slate-900"
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl dark:text-slate-100">
            {value}
          </p>
          {description && (
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
              {description}
            </p>
          )}
        </div>
        <div className={cn("rounded-xl p-3", colorClass)}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  )
}
