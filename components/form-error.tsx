interface FormErrorProps {
  error?: {
    message?: string;
  };
}

export default function FormError({ error }: FormErrorProps): JSX.Element | null {
  return error ? <p className="mt-1 text-red-500">{error.message}</p> : null
}