import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }
  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: inherit !important;
    opacity: 0.8; /* Firefox */
  }
  a:hover {
    text-decoration: none !important;
  }
`

export default GlobalStyle
