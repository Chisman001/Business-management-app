import { createClient } from "@/lib/supabase/server"
import { ProductsTable } from "@/components/products/products-table"
import { AddProductForm } from "@/components/products/add-product-form"
import { ProductsToolbar } from "@/components/products/products-toolbar"
import { Suspense } from "react"

export const dynamic = "force-dynamic"

type SearchParams = {
  search?: string
  category?: string
}

async function getProducts(search: string, category: string) {
  const supabase = createClient()

  let query = supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })

  if (search) {
    query = query.ilike("name", `%${search}%`)
  }
  if (category) {
    query = query.eq("category", category)
  }

  const { data, error } = await query
  if (error) throw new Error(error.message)
  return data ?? []
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const search = searchParams.search ?? ""
  const category = searchParams.category ?? ""
  const products = await getProducts(search, category)

  return (
    <div className="p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Products
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {products.length} product{products.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <AddProductForm />
      </div>

      <div className="mb-4">
        <Suspense>
          <ProductsToolbar />
        </Suspense>
      </div>

      <ProductsTable products={products} />
    </div>
  )
}
