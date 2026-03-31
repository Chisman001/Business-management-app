import { type Customer } from "@/lib/types"
import { DeleteCustomerButton } from "./delete-customer-button"
import { Users } from "lucide-react"

type CustomersTableProps = {
  customers: Customer[]
}

export function CustomersTable({ customers }: CustomersTableProps) {
  if (customers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-16 dark:border-slate-700">
        <Users size={36} className="mb-3 text-slate-300 dark:text-slate-600" />
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          No customers yet
        </p>
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
          Add your first customer using the button above
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
            <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Name
            </th>
            <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Phone Number
            </th>
            <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Added
            </th>
            <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
          {customers.map((customer) => (
            <tr
              key={customer.id}
              className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-50 text-rose-600 text-xs font-bold dark:bg-rose-950 dark:text-rose-400">
                    {customer.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {customer.name}
                  </span>
                </div>
              </td>
              <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                {customer.phone_number}
              </td>
              <td className="px-5 py-4 text-slate-400 dark:text-slate-500">
                {new Date(customer.created_at).toLocaleDateString()}
              </td>
              <td className="px-5 py-4 text-right">
                <DeleteCustomerButton id={customer.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}
