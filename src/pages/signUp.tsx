import type { NextPage } from 'next'

import { AuthInput, AuthButton, AuthCard, AuthContainer } from '../components/auth'

import { FiImage, FiLock, FiMail, FiUser } from "react-icons/fi"
import { Avatar, Text } from '@chakra-ui/react'
import { Link } from '../components/Link/Link'
import { useCallback, useContext, useEffect, useState } from 'react'
import { api } from '../services/api'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { AuthContext } from '../context/authContext'
import { appConfig } from '../config'

const rightEmailAddon = appConfig.auth.defaultMail

const SignUp: NextPage = () => {

  const { appLoading } = useContext(AuthContext)

  const [loading, setLoading] = useState(false)

  const [emailValue, setEmailValue] = useState('')
  const [imageValue, setImageValue] = useState('')
  const [nameValue, setNameValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  const router = useRouter()

  const handleSubmit = useCallback(async () => {
    setLoading(true)
    await api.post('/users', {
      email: rightEmailAddon ? emailValue+rightEmailAddon : emailValue,
      username: nameValue,
      password: passwordValue,
      image: imageValue
    }).then(
      response => {
        setEmailValue('')
        setImageValue('')
        setNameValue('')
        setPasswordValue('')
        toast.success(`Usuário ${response?.data?.username} criado com sucesso!`)
        router.push('/');
      }
    ).catch(
      (error) => {
        toast.error(`Erro ao criar usuário`)
      }
    ).finally(
      () => {setLoading(false)}
    )


  }, [emailValue, nameValue, passwordValue, imageValue, router])

  return (
    <AuthContainer>
      <AuthCard title="Cadastro" loading={appLoading} >
        <Avatar size="lg" src={imageValue} />
        <AuthInput
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          type="email"
          rightAddon={rightEmailAddon}
          placeholder="Email"
          icon={FiMail}
        />
        <AuthInput
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
          type="text"
          placeholder="Nome"
          icon={FiUser}
        />
        <AuthInput
          value={imageValue}
          onChange={(e) => setImageValue(e.target.value)}
          type="text"
          placeholder="Avatar Url"
          icon={FiImage}
        />
        <AuthInput
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          type="password"
          placeholder="Senha"
          icon={FiLock}
        />
        <AuthButton onClick={() => handleSubmit()} isLoading={loading} >Cadastrar</AuthButton>
        <Text fontSize="13px" color="gray.400">
          Já tem uma conta?
          <Link href="/"> Clique aqui</Link>
        </Text>
      </AuthCard>
    </AuthContainer>
  )
}

export default SignUp
