import { type Order, type Customer, type OrderStatus } from "@/lib/types"
import { EditOrderModal } from "./edit-order-modal"
import { DeleteOrderButton } from "./delete-order-button"
import { ShoppingCart } from "lucide-react"

type OrdersListProps = {
  orders: Order[]
  customers: Customer[]
}

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending:   "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
  confirmed: "bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  completed: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
  cancelled: "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400",
}

export function OrdersList({ orders, customers }: OrdersListProps) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-16 dark:border-slate-700">
        <ShoppingCart
          size={36}
          className="mb-3 text-slate-300 dark:text-slate-600"
        />
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          No orders yet
        </p>
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
          Use the form to place your first order
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition-all duration-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <ShoppingCart size={18} />
            </div>
            <div>
              <p className="font-medium text-slate-900 dark:text-slate-100">
                {order.product_name}
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                {order.category} &middot; Qty: {order.quantity} &middot;{" "}
                {new Date(order.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_STYLES[order.status] ?? STATUS_STYLES.pending}`}
            >
              {order.status}
            </span>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              ${Number(order.price).toFixed(2)}
            </span>
            <div className="flex items-center gap-1">
              <EditOrderModal order={order} customers={customers} />
              <DeleteOrderButton id={order.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
