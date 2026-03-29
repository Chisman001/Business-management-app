"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { type ActionResult } from "@/lib/types"

export async function addCustomer(formData: FormData): Promise<ActionResult> {
  const name = formData.get("name") as string
  const phone_number = formData.get("phone_number") as string

  if (!name || !phone_number) {
    return { error: "Name and phone number are required." }
  }

  const supabase = createClient()
  const { error } = await supabase
    .from("customers")
    .insert({ name, phone_number })

  if (error) return { error: error.message }

  revalidatePath("/customers")
  revalidatePath("/dashboard")
  return { success: true }
}

export async function deleteCustomer(id: string): Promise<ActionResult> {
  if (!id) return { error: "Customer ID is required." }

  const supabase = createClient()
  const { error } = await supabase.from("customers").delete().eq("id", id)

  if (error) return { error: error.message }

  revalidatePath("/customers")
  revalidatePath("/dashboard")
  return { success: true }
}
