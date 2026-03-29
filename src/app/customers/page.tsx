import { createClient } from "@/lib/supabase/server"
import { CustomersTable } from "@/components/customers/customers-table"
import { AddCustomerForm } from "@/components/customers/add-customer-form"

export const dynamic = "force-dynamic"

async function getCustomers() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) throw new Error(error.message)
  return data ?? []
}

export default async function CustomersPage() {
  const customers = await getCustomers()

  return (
    <div className="p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Customers
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {customers.length} registered customer
            {customers.length !== 1 ? "s" : ""}
          </p>
        </div>
        <AddCustomerForm />
      </div>

      <CustomersTable customers={customers} />
    </div>
  )
}
