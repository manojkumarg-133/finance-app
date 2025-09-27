'use client'
import Button from "@/components/button";
import Input from "@/components/input";
import Label from "@/components/label";
import Select from "@/components/select";
import { categories, types } from "@/lib/consts";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { transactionSchema } from "@/lib/validation";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation"
import { createTransaction } from "@/lib/actions";
import FormError from "@/components/form-error";
import { z } from "zod";

type TransactionFormData = z.infer<typeof transactionSchema>;

export default function TransactionForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TransactionFormData>({
    mode: "onTouched",
    resolver: zodResolver(transactionSchema)
  })
  const router = useRouter()
  const [isSaving, setSaving] = useState<boolean>(false)
  const [lastError, setLastError] = useState<Error | undefined>()
  const type = watch("type")

  const onSubmit: SubmitHandler<TransactionFormData> = async (data) => {
    setSaving(true)
    setLastError(undefined)
    try {
      await createTransaction(data)
      router.push('/dashboard')
    } 
    catch (error) {
      setLastError(error as Error)
    }
    finally {
      setSaving(false)
    }
  }

  return <form className="space-y-4"
    onSubmit={handleSubmit(onSubmit)}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label className="mb-1">Type</Label>
        <Select {...register("type", {
          onChange: (e: ChangeEvent<HTMLSelectElement>) => {
            if (e.target.value !== "Expense") {
              setValue("category", "")
            }
          }
        })}>
          {types.map((type: string) => <option key={type}>
            {type}
          </option>)}
        </Select>
        <FormError error={errors.type} />
      </div>

      <div>
        <Label className="mb-1">Category</Label>
        <Select {...register("category")} disabled={type !== 'Expense'}>
          <option value="">Select a category</option>
          {categories.map((category: string) => <option key={category}>
            {category}
          </option>)}
        </Select>
        <FormError error={errors.category} />
      </div>

      <div>
        <Label className="mb-1">Date</Label>
        <Input {...register("created_at")} />
        <FormError error={errors.created_at} />
      </div>

      <div>
        <Label className="mb-1">Amount</Label>
        <Input type="number" {...register("amount")} />
        <FormError error={errors.amount} />
      </div>

      <div className="col-span-1 md:col-span-2">
        <Label className="mb-1">Description</Label>
        <Input {...register("description")} />
        <FormError error={errors.description} />
      </div>
    </div>

    <div className="flex justify-between items-center">
      <div>
        {lastError && <FormError error={lastError} />}
      </div>
      <Button type="submit" disabled={isSaving}>Save</Button>
    </div>
  </form>
}