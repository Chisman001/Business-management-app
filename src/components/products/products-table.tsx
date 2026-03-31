import { type Product } from "@/lib/types"
import { DeleteProductButton } from "./delete-product-button"
import { Package } from "lucide-react"
import { cn } from "@/lib/utils"

type ProductsTableProps = {
  products: Product[]
}

export function ProductsTable({ products }: ProductsTableProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 py-16 dark:border-slate-700">
        <Package size={36} className="mb-3 text-slate-300 dark:text-slate-600" />
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          No products found
        </p>
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
          Add your first product using the button above
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
              Product Name
            </th>
            <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Category
            </th>
            <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Price
            </th>
            <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Stock
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
          {products.map((product) => (
            <tr
              key={product.id}
              className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <td className="px-5 py-4 font-medium text-slate-900 dark:text-slate-100">
                {product.name}
              </td>
              <td className="px-5 py-4">
                <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  {product.category}
                </span>
              </td>
              <td className="px-5 py-4 font-semibold text-emerald-600 dark:text-emerald-400">
                ${Number(product.price).toFixed(2)}
              </td>
              <td className="px-5 py-4">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                    product.stock_quantity === 0
                      ? "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400"
                      : product.stock_quantity <= 10
                        ? "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                        : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                  )}
                >
                  {product.stock_quantity === 0
                    ? "Out of stock"
                    : `${product.stock_quantity} units`}
                </span>
              </td>
              <td className="px-5 py-4 text-slate-400 dark:text-slate-500">
                {new Date(product.created_at).toLocaleDateString()}
              </td>
              <td className="px-5 py-4 text-right">
                <DeleteProductButton id={product.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}
