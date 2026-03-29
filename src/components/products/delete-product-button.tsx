"use client"

import { useTransition } from "react"
import { deleteProduct } from "@/actions/product-actions"
import { Trash2, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

export function DeleteProductButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    if (!confirm("Delete this product? This cannot be undone.")) return
    startTransition(async () => {
      await deleteProduct(id)
    })
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      aria-label="Delete product"
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-lg",
        "text-slate-400 hover:bg-red-50 hover:text-red-600",
        "dark:hover:bg-red-950 dark:hover:text-red-400",
        "transition-colors duration-200 disabled:opacity-50"
      )}
    >
      {isPending ? (
        <Loader2 size={14} className="animate-spin" />
      ) : (
        <Trash2 size={14} />
      )}
    </button>
  )
}
