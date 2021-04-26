import { Button, ButtonProps } from "@pancakeswap-libs/uikit"
import styled, { useTheme } from "styled-components"
import React from 'react'

const ResetButton = styled.div`
  button {
    border-radius: 99px;
  }
`

const DarkPrimary = styled.div`
  button {
    color: black !important;
  }
  color: black !important;
`

const DarkTertiary = styled.div`
  button {
    background-color: transparent;
    border: thin solid #686868;
  }
`

const AppButton =  (props: ButtonProps) => {
  let { variant } = props
  variant = variant || Button.defaultProps.variant
  const { isDark } = useTheme()
  if (isDark) {
    switch (variant) {
      case 'primary':
        return <DarkPrimary><Button {...props} /></DarkPrimary>
      case 'tertiary':
        return <DarkTertiary><Button {...props} /></DarkTertiary>
      default:
      return (<Button {...props}/>)
    }
  }
  return (<Button {...props}/>)
}

export default (props: ButtonProps) => <ResetButton><AppButton {...props}/></ResetButton>
