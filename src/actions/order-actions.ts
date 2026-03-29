"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { type ActionResult } from "@/lib/types"

export async function addOrder(formData: FormData): Promise<ActionResult> {
  const product_name = formData.get("product_name") as string
  const price = formData.get("price") as string
  const quantity = formData.get("quantity") as string
  const category = formData.get("category") as string
  const customer_id = (formData.get("customer_id") as string) || null
  const status = (formData.get("status") as string) || "pending"

  if (!product_name || !price || !category) {
    return { error: "All fields are required." }
  }

  const priceNum = parseFloat(price)
  if (isNaN(priceNum) || priceNum <= 0) {
    return { error: "Price must be a valid positive number." }
  }

  const quantityNum = parseInt(quantity, 10) || 1
  if (isNaN(quantityNum) || quantityNum < 1) {
    return { error: "Quantity must be at least 1." }
  }

  const supabase = createClient()
  const { error } = await supabase
    .from("orders")
    .insert({ product_name, price: priceNum, quantity: quantityNum, category, customer_id, status })

  if (error) return { error: error.message }

  revalidatePath("/orders")
  revalidatePath("/dashboard")
  return { success: true }
}

export async function updateOrder(
  id: string,
  formData: FormData
): Promise<ActionResult> {
  const product_name = formData.get("product_name") as string
  const price = formData.get("price") as string
  const quantity = formData.get("quantity") as string
  const category = formData.get("category") as string
  const customer_id = (formData.get("customer_id") as string) || null
  const status = formData.get("status") as string

  if (!id || !product_name || !price || !category || !status) {
    return { error: "All fields are required." }
  }

  const priceNum = parseFloat(price)
  if (isNaN(priceNum) || priceNum <= 0) {
    return { error: "Price must be a valid positive number." }
  }

  const quantityNum = parseInt(quantity, 10) || 1
  if (isNaN(quantityNum) || quantityNum < 1) {
    return { error: "Quantity must be at least 1." }
  }

  const supabase = createClient()
  const { error } = await supabase
    .from("orders")
    .update({ product_name, price: priceNum, quantity: quantityNum, category, customer_id, status })
    .eq("id", id)

  if (error) return { error: error.message }

  revalidatePath("/orders")
  revalidatePath("/dashboard")
  return { success: true }
}

export async function deleteOrder(id: string): Promise<ActionResult> {
  if (!id) return { error: "Order ID is required." }

  const supabase = createClient()
  const { error } = await supabase.from("orders").delete().eq("id", id)

  if (error) return { error: error.message }

  revalidatePath("/orders")
  revalidatePath("/dashboard")
  return { success: true }
}
