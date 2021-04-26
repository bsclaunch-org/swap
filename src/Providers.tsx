import React from 'react'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import { Provider } from 'react-redux'
import styled from 'styled-components'
import { ModalProvider } from '@pancakeswap-libs/uikit'
import { NetworkContextName } from './constants'
import store from './state'
import getLibrary from './utils/getLibrary'
import { ThemeContextProvider } from './ThemeContext'

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

const ModalModified = styled.div`
  div[role="presentation"] {
    background-color: rgba(0, 0, 0, 0.8);
  }
`

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Provider store={store}>
          <ThemeContextProvider>
            <ModalModified>
              <ModalProvider>{children}</ModalProvider>
            </ModalModified>
          </ThemeContextProvider>
        </Provider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  )
}

export default Providers
