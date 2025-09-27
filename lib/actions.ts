'use server'
import { revalidatePath } from 'next/cache'
import { createClient } from './supabase/server'
import { transactionSchema } from './validation'
import { z } from 'zod'

type TransactionData = z.infer<typeof transactionSchema>;

export async function createTransaction(formData: TransactionData): Promise<void> {
  const validated = transactionSchema.safeParse(formData)
  if (!validated.success) {
    throw new Error('Invalid data')
  }

  const { error } = await createClient().from('transactions')
    .insert(formData)

  if (error) {
    console.log('Supabase error:', error)
    throw new Error(`Failed creating the transaction: ${error.message}`)
  }

  revalidatePath('/dashboard')
}