import AppProvider from '@/hooks'
import { ProtectRoute } from '@/hooks/auth'
import React from 'react'
import GlobalStyle from '../styles/GlobalStyle'

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <ProtectRoute>
        <Component {...pageProps} />
      </ProtectRoute>
      <GlobalStyle />
    </AppProvider>
  )
}

export default MyApp
