import { TransactionType as ConstTransactionType } from './consts'

export type TransactionType = ConstTransactionType

export interface Transaction {
  id: number
  amount: number
  type: TransactionType
  description?: string
  category?: string
  created_at: string
}

export interface TrendData {
  type: TransactionType
  amount: number
  prevAmount: number
}