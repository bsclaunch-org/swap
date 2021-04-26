import React, { useState } from 'react'
import { DefaultTheme, ThemeProvider as SCThemeProvider } from 'styled-components'
import { dark } from '@pancakeswap-libs/uikit'

const CACHE_KEY = 'IS_DARK'

const ourDark: DefaultTheme = {
  ...dark,
  colors: {
    ...dark.colors,
    primary: '#FFC107',
    primaryBright: '#121212',
    background: '#121212',
    text: '#fff',
    textSubtle: '#FFE491',
    input: 'transparent',
    // borderColor: '#FFC107',
    backgroundDisabled: '#FFE491'
  },
  card: { ...dark.card, background: '#2f2f2f' },
  modal: { ...dark.modal, background: '#2f2f2f' },
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType>({ isDark: false, toggleTheme: () => null })

const ThemeContextProvider: React.FC = ({ children }) => {
  // const [isDark, setIsDark] = useState(() => {
  //   const isDarkUserSetting = localStorage.getItem(CACHE_KEY)
  //   return isDarkUserSetting ? JSON.parse(isDarkUserSetting) : false
  // })

  const toggleTheme = () => {
    // setIsDark((prevState: any) => {
    //   localStorage.setItem(CACHE_KEY, JSON.stringify(!prevState))
    //   return !prevState
    // })
  }

  return (
    <ThemeContext.Provider value={{ isDark: true, toggleTheme }}>
      <SCThemeProvider theme={ourDark}>{children}</SCThemeProvider>
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeContextProvider }
