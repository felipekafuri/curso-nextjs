import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import api from '@/services/api'
import { useRouter } from 'next/router'
import SignIn from '@/pages/signin'

interface Provider {
  name: string
  fantasyName: string
  email: string
  phone: string
  CEP: string
  bio: string
  documentNumber: string
}

interface SignInCredentials {
  email: string
  password: string
}

interface AuthProviderState {
  provider: Provider
  token: string
}

interface AuthContextData {
  provider: Provider
  signIn(credentials: SignInCredentials): Promise<void>
  signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC = ({ children }) => {
  const [providerData, setProviderData] = useState<AuthProviderState>()

  useEffect(() => {
    async function loadProvider() {
      const token = localStorage.getItem('@Helpy:token')
      const provider = localStorage.getItem('@Helpy:provider')

      if (token && provider) {
        api.defaults.headers.authorization = `Bearer ${token}`

        setProviderData({ token, provider: JSON.parse(provider) })
      }
    }

    loadProvider()
  }, [])

  const router = useRouter()

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions/providers', { email, password })

    const { provider, token } = response.data
    localStorage.setItem('@Helpy:token', token)
    localStorage.setItem('@Helpy:provider', JSON.stringify(provider))

    api.defaults.headers.authorization = `Bearer ${token}`

    setProviderData({ provider, token })
    router.reload()
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@Helpy:token')
    localStorage.removeItem('@Helpy:provider')

    setProviderData({} as AuthProviderState)
  }, [])

  return (
    <AuthContext.Provider
      value={{ provider: providerData?.provider, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export { AuthContext, AuthProvider, useAuth }

export const ProtectRoute = ({ children }) => {
  const { provider } = useAuth()
  if (!provider) {
    return <SignIn />
  } else if (window.location.pathname !== '/') {
  }
  return children
}
