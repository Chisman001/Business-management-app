"use client"

import { useRef, useState, useTransition } from "react"
import { addCustomer } from "@/actions/customer-actions"
import { Plus, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function AddCustomerForm() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    setError(null)
    startTransition(async () => {
      const result = await addCustomer(formData)
      if (result.error) {
        setError(result.error)
      } else {
        formRef.current?.reset()
        setIsOpen(false)
      }
    })
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className={cn(
          "flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium",
          "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800",
          "transition-colors duration-200 shadow-sm"
        )}
      >
        <Plus size={16} />
        Add Customer
      </button>

      {isOpen && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
            New Customer
          </h3>
          <form ref={formRef} action={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g. John Doe"
                required
                className={cn(
                  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm",
                  "text-slate-900 outline-none transition-colors placeholder:text-slate-400",
                  "focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20",
                  "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                )}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone_number"
                placeholder="e.g. +1 555 000 0000"
                required
                className={cn(
                  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm",
                  "text-slate-900 outline-none transition-colors placeholder:text-slate-400",
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
                  "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium",
                  "bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60",
                  "transition-colors duration-200"
                )}
              >
                {isPending && <Loader2 size={14} className="animate-spin" />}
                {isPending ? "Saving…" : "Save Customer"}
              </button>
              <button
                type="button"
                onClick={() => { setIsOpen(false); setError(null) }}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium",
                  "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800",
                  "transition-colors duration-200"
                )}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
