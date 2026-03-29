import { createClient } from "@/lib/supabase/server"
import { OrderForm } from "@/components/orders/order-form"
import { OrdersList } from "@/components/orders/orders-list"

export const dynamic = "force-dynamic"

async function getOrdersAndCustomers() {
  const supabase = createClient()

  const [ordersRes, customersRes] = await Promise.all([
    supabase.from("orders").select("*").order("created_at", { ascending: false }),
    supabase.from("customers").select("*").order("name", { ascending: true }),
  ])

  if (ordersRes.error) throw new Error(ordersRes.error.message)
  if (customersRes.error) throw new Error(customersRes.error.message)

  return {
    orders: ordersRes.data ?? [],
    customers: customersRes.data ?? [],
  }
}

export default async function OrdersPage() {
  const { orders, customers } = await getOrdersAndCustomers()

  const totalRevenue = orders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + (o.price ?? 0), 0)

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Orders
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {orders.length} order{orders.length !== 1 ? "s" : ""} &middot; Revenue
          from completed orders:{" "}
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            ${totalRevenue.toFixed(2)}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <OrderForm customers={customers} />
        </div>
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
            Order History
          </h2>
          <OrdersList orders={orders} customers={customers} />
        </div>
      </div>
    </div>
  )
}
