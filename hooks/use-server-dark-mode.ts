import { cookies } from 'next/headers'

const useServerDarkMode = (defaultTheme: string = 'dark'): string => {
  return cookies().get('theme')?.value ?? defaultTheme
}

export default useServerDarkMode