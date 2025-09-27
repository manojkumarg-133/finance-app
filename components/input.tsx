import { forwardRef, InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
  const styles = {
    'checkbox': 'rounded border-gray-300 text-gray-700 bg-white dark:bg-gray-950 dark:text-gray-500 shadow-sm',
    'default': 'w-full rounded-md shadow-sm border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950'
  }
  return <input ref={ref} {...props} className={styles[props.type as keyof typeof styles] ?? styles['default']} />
})