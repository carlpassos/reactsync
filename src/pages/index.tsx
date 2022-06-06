import type { NextPage } from 'next'

import { AuthInput, AuthButton, AuthCard, AuthContainer } from '../components/auth'

import { FiLock, FiLogIn, FiMail } from "react-icons/fi"
import { Icon, Text } from '@chakra-ui/react'
import { Link } from '../components/Link/Link'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/authContext'
import { appConfig } from '../config'

const rightEmailAddon = appConfig.auth.defaultMail

const Home: NextPage = () => {

  const { signIn, user, appLoading, authLoading } = useContext(AuthContext)

  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <AuthContainer>
      <AuthCard title="Login" loading={appLoading} >
        { user ? <Text>Usuário logado: {user?.name}</Text> : <Text>Usuário deslogado</Text>}

        {rightEmailAddon && (
          <AuthInput
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            rightAddon={rightEmailAddon}
            type="email"
            placeholder="Email"
            icon={FiMail}
          />
        )}
        <AuthInput
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          type="password"
          placeholder="Senha"
          icon={FiLock}
        />
        <AuthButton
          leftIcon={<Icon as={FiLogIn} />}
          isLoading={authLoading}
          onClick={() => signIn(emailValue+rightEmailAddon, passwordValue)}
        >
          Entrar
        </AuthButton>
        <Text fontSize="13px" color="gray.400">
          Ainda não tem uma conta?
          <Link href="/signUp"> Clique aqui</Link>
        </Text>
      </AuthCard>
    </AuthContainer>
  )
}

export default Home
