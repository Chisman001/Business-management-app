"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { type ActionResult } from "@/lib/types"

export async function addProduct(formData: FormData): Promise<ActionResult> {
  const name = formData.get("name") as string
  const price = formData.get("price") as string
  const category = formData.get("category") as string
  const stock_quantity = formData.get("stock_quantity") as string

  if (!name || !price || !category || stock_quantity === null) {
    return { error: "All fields are required." }
  }

  const priceNum = parseFloat(price)
  if (isNaN(priceNum) || priceNum <= 0) {
    return { error: "Price must be a valid positive number." }
  }

  const stockNum = parseInt(stock_quantity, 10)
  if (isNaN(stockNum) || stockNum < 0) {
    return { error: "Stock quantity must be a valid non-negative number." }
  }

  const supabase = createClient()
  const { error } = await supabase
    .from("products")
    .insert({ name, price: priceNum, category, stock_quantity: stockNum })

  if (error) return { error: error.message }

  revalidatePath("/products")
  revalidatePath("/dashboard")
  return { success: true }
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  if (!id) return { error: "Product ID is required." }

  const supabase = createClient()
  const { error } = await supabase.from("products").delete().eq("id", id)

  if (error) return { error: error.message }

  revalidatePath("/products")
  revalidatePath("/dashboard")
  return { success: true }
}
