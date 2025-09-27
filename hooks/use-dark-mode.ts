import { useState } from 'react'
import { useCookies } from 'react-cookie'

interface UseDarkModeReturn {
  theme: string;
  toggleTheme: () => void;
}

const useDarkMode = (defaultTheme: string = 'dark'): UseDarkModeReturn => {
  const [theme, setTheme] = useState<string>(defaultTheme)
  const [_, setCookie] = useCookies(['theme'])

  const setAndSaveTheme = (theme: string): void => {
    setTheme(theme)
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
    setCookie('theme', theme)
  }
  const toggleTheme = (): void => {
    setAndSaveTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return { theme, toggleTheme }
}

export default useDarkMode