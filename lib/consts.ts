export const types = [
  'Income', 'Expense', 'Investment', 'Saving'
] as const

export const categories = [
  'Housing', 'Transport', 'Health', 'Food', 'Education', 'Other'
] as const

export type TransactionType = typeof types[number]
export type CategoryType = typeof categories[number]