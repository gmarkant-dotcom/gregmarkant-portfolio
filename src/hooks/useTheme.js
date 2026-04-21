import { useState, useCallback, useEffect } from 'react'
import { themes, getTheme, getAllThemes } from '../data/themes.config'

export function useTheme() {
  const [activeTheme, setActiveTheme] = useState(getTheme('body_talk'))

  const applyTheme = useCallback((themeId) => {
    const theme = getTheme(themeId)
    if (!theme) return

    // Write every token from the theme object onto :root
    Object.entries(theme.tokens).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value)
    })

    // Set a data attribute on body for any CSS selectors that need it
    document.body.setAttribute('data-theme', themeId)

    setActiveTheme(theme)
  }, [])

  const clearTheme = useCallback(() => {
    Object.values(themes).forEach((t) => {
      Object.keys(t.tokens).forEach((property) => {
        document.documentElement.style.removeProperty(property)
      })
    })
    document.body.removeAttribute('data-theme')
    setActiveTheme(null)
  }, [])

  useEffect(() => {
    if (!getAllThemes().length) return
    applyTheme('body_talk')
  }, [applyTheme])

  return { activeTheme, applyTheme, clearTheme }
}
