import { useState, useCallback, useEffect } from 'react'
import { getTheme, getAllThemes } from '../data/themes.config'

export function useTheme() {
  const [activeTheme, setActiveTheme] = useState(null)

  const applyTheme = useCallback((themeId) => {
    const theme = getTheme(themeId)
    if (!theme) return

    // Write every token from the theme object onto :root
    Object.entries(theme.tokens).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value)
    })

    // Set a data attribute on body for any CSS selectors that need it
    document.body.setAttribute('data-theme', themeId)
    document.body.setAttribute('data-theme', theme.id)

    setActiveTheme(theme)
  }, [])

  const clearTheme = useCallback(() => {
    getAllThemes().forEach((t) => {
      Object.keys(t.tokens).forEach((property) => {
        document.documentElement.style.removeProperty(property)
      })
    })
    document.body.removeAttribute('data-theme')
    setActiveTheme(null)
  }, [])

  useEffect(() => {
    const defaultTheme = getAllThemes()[0]
    if (!defaultTheme) return undefined

    const frameId = window.requestAnimationFrame(() => {
      applyTheme(defaultTheme.id)
    })

    return () => {
      window.cancelAnimationFrame(frameId)
    }
  }, [applyTheme])

  return { activeTheme, applyTheme, clearTheme }
}
