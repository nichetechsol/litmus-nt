'use client'

import { ThemeProvider } from 'next-themes'
import { useEffect, useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [defaultTheme, setDefaultTheme] = useState('system') // Initial state

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    console.log("storedTheme",storedTheme);
    
    if (storedTheme) {
      setDefaultTheme(storedTheme) // Use stored theme or fallback to dark
    }
  }, []) // Empty dependency array ensures useEffect runs only on mount

  return (
    <ThemeProvider
      attribute="class" // Adjust attribute as needed
      defaultTheme={defaultTheme} // Dynamically set default theme
      enableSystem // Enable system preference support (optional)
    >
      {children}
    </ThemeProvider>
  )
}