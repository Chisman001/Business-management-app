import { createClient } from "@/lib/supabase/server"
import { StatCard } from "@/components/layout/stat-card"
import { Package, ShoppingCart, DollarSign, Users } from "lucide-react"

export const dynamic = "force-dynamic"

async function getDashboardStats() {
  const supabase = createClient()

  const [productsRes, ordersRes, revenueRes, customersRes] = await Promise.all([
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("orders").select("id", { count: "exact", head: true }),
    supabase.from("orders").select("price").eq("status", "completed"),
    supabase.from("customers").select("id", { count: "exact", head: true }),
  ])

  const totalRevenue = (revenueRes.data ?? []).reduce(
    (sum, row) => sum + (row.price ?? 0),
    0
  )

  const completedOrderCount = revenueRes.data?.length ?? 0

  return {
    totalProducts: productsRes.count ?? 0,
    totalOrders: ordersRes.count ?? 0,
    totalRevenue,
    completedOrderCount,
    totalCustomers: customersRes.count ?? 0,
  }
}

export default async function DashboardPage() {
  const stats = await getDashboardStats()

  const cards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      description: "Products in inventory",
      colorClass:
        "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      description: "All time orders placed",
      colorClass:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      description: "Revenue from completed orders",
      colorClass:
        "bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
    },
    {
      title: "Total Customers",
      value: stats.totalCustomers,
      icon: Users,
      description: "Registered customers",
      colorClass:
        "bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400",
    },
  ]

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Overview of your textile business
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-6 xl:grid-cols-4">
        {cards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            description={card.description}
            colorClass={card.colorClass}
          />
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-4 text-base font-semibold text-slate-900 dark:text-slate-100">
          Quick Summary
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Average Order Value
            </p>
            <p className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">
              {stats.completedOrderCount > 0
                ? `$${(stats.totalRevenue / stats.completedOrderCount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                : "$0.00"}
            </p>
          </div>
          <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Revenue per Customer
            </p>
            <p className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">
              {stats.totalCustomers > 0
                ? `$${(stats.totalRevenue / stats.totalCustomers).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                : "$0.00"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
