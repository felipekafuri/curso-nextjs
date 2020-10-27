import React, { FormEvent, useCallback, useState } from 'react'

import { Container } from '../styles/pages/SignIn'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/router'
const SignIn: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const { signIn } = useAuth()

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault()

    await signIn({ email, password })
    router.push('/')
  }, [])
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          E-mail:
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>

        <button type="submit">Log-in</button>
      </form>
    </Container>
  )
}

export default SignIn
