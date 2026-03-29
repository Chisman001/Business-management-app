"use client"

import { useRef, useState, useTransition } from "react"
import { addOrder } from "@/actions/order-actions"
import { PRODUCT_NAMES, PRODUCT_CATEGORIES, ORDER_STATUSES, type Customer } from "@/lib/types"
import { Plus, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type OrderFormProps = {
  customers: Customer[]
}

export function OrderForm({ customers }: OrderFormProps) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    setError(null)
    setSuccess(false)
    startTransition(async () => {
      const result = await addOrder(formData)
      if (result.error) {
        setError(result.error)
      } else {
        formRef.current?.reset()
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      }
    })
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-5 text-base font-semibold text-slate-900 dark:text-slate-100">
        Place New Order
      </h2>
      <form ref={formRef} action={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
            Product Name
          </label>
          <select
            name="product_name"
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
            defaultValue="pending"
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
            placeholder="0.00"
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
            defaultValue={1}
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

        {success && (
          <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
            Order placed successfully!
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium",
            "bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60",
            "transition-colors duration-200"
          )}
        >
          {isPending ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Plus size={14} />
          )}
          {isPending ? "Placing Order…" : "Place Order"}
        </button>
      </form>
    </div>
  )
}
