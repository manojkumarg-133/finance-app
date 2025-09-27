import BaseTrend from "@/components/trend"
import { createClient } from "@/lib/supabase/server"
import { TransactionType } from "@/lib/types"

interface TrendProps {
  type: TransactionType
}

export default async function Trend({ type }: TrendProps): Promise<JSX.Element> {
  const supabase = createClient()
  
  // Try to call the stored procedure first
  let { data, error } = await supabase
    .rpc('calculate_total', {
      type_arg: type
    })
  
  let amount = 0
  
  if (error) {
    // Fallback: query transactions table directly if stored procedure doesn't exist
    console.warn('Stored procedure not found, using fallback query')
    const { data: transactions, error: queryError } = await supabase
      .from('transactions')
      .select('amount')
      .eq('type', type)
    
    if (queryError) {
      console.error('Error fetching transactions:', queryError)
      amount = 0
    } else {
      amount = transactions?.reduce((sum, t) => sum + t.amount, 0) ?? 0
    }
  } else {
    amount = data ?? 0
  }

  return <BaseTrend type={type} amount={amount} prevAmount={amount - 500} />
}