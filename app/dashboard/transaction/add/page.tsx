import TransactionForm from "../../components/transaction-form"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Add Transaction"
}

export default function Page(): JSX.Element {
  return <>
    <h1 className="text-4xl font-semibold mb-8">Add Transaction</h1>
    <TransactionForm />
  </>
}