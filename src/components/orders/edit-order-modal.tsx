"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { useState, useTransition } from "react"
import { updateOrder } from "@/actions/order-actions"
import { PRODUCT_NAMES, PRODUCT_CATEGORIES, ORDER_STATUSES, type Order, type Customer } from "@/lib/types"
import { Pencil, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function EditOrderModal({ order, customers }: { order: Order; customers: Customer[] }) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setError(null)
    startTransition(async () => {
      const result = await updateOrder(order.id, formData)
      if (result.error) {
        setError(result.error)
      } else {
        setOpen(false)
      }
    })
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          aria-label="Edit order"
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg",
            "text-slate-400 hover:bg-indigo-50 hover:text-indigo-600",
            "dark:hover:bg-indigo-950 dark:hover:text-indigo-400",
            "transition-colors duration-200"
          )}
        >
          <Pencil size={14} />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2",
            "rounded-2xl border border-slate-200 bg-white p-6 shadow-xl",
            "dark:border-slate-800 dark:bg-slate-900",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-left-1/2 data-[state=open]:slide-in-from-left-1/2",
            "duration-200"
          )}
        >
          <div className="mb-5 flex items-center justify-between">
            <Dialog.Title className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Edit Order
            </Dialog.Title>
            <Dialog.Close
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg",
                "text-slate-400 hover:bg-slate-100 hover:text-slate-600",
                "dark:hover:bg-slate-800 dark:hover:text-slate-300",
                "transition-colors duration-200"
              )}
            >
              <X size={16} />
            </Dialog.Close>
          </div>

          <form action={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                Product Name
              </label>
              <select
                name="product_name"
                defaultValue={order.product_name}
                required
                className={cn(
                  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm",
                  "text-slate-900 outline-none transition-colors",
                  "focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20",
                  "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                )}
              >
                <option value="">Select product…</option>
                {PRODUCT_NAMES.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                Category
              </label>
              <select
                name="category"
                defaultValue={order.category}
                required
                className={cn(
                  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm",
                  "text-slate-900 outline-none transition-colors",
                  "focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20",
                  "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                )}
              >
                <option value="">Select category…</option>
                {PRODUCT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                Customer
              </label>
              <select
                name="customer_id"
                defaultValue={order.customer_id ?? ""}
                className={cn(
                  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm",
                  "text-slate-900 outline-none transition-colors",
                  "focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20",
                  "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                )}
              >
                <option value="">No customer assigned</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                Status
              </label>
              <select
                name="status"
                defaultValue={order.status}
                required
                className={cn(
                  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm",
                  "text-slate-900 outline-none transition-colors",
                  "focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20",
                  "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                )}
              >
                {ORDER_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                min="0"
                step="0.01"
                defaultValue={order.price}
                required
                className={cn(
                  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm",
                  "text-slate-900 outline-none transition-colors",
                  "focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20",
                  "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                )}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                min="1"
                step="1"
                defaultValue={order.quantity}
                required
                className={cn(
                  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm",
                  "text-slate-900 outline-none transition-colors",
                  "focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20",
                  "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                )}
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
                {error}
              </p>
            )}

            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                disabled={isPending}
                className={cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium",
                  "bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60",
                  "transition-colors duration-200"
                )}
              >
                {isPending && <Loader2 size={14} className="animate-spin" />}
                {isPending ? "Saving…" : "Save Changes"}
              </button>
              <Dialog.Close
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium",
                  "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800",
                  "transition-colors duration-200"
                )}
              >
                Cancel
              </Dialog.Close>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
