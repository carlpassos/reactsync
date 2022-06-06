import { createContext, ReactNode, useEffect, useState } from "react";
import nookies, { parseCookies } from 'nookies'
import { api } from "../services/api";
import { toast } from "react-toastify";

interface ProductsProviderProps {
  children: ReactNode
}

interface AuthContextData {
  user: any;
  appLoading: boolean;
  authLoading: boolean;
  signIn: (email: string, password: string) => void;
}


type userData = {
  id: number,
  name: string,
  username: string,
  email: string,
  image: string,
}


export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: ProductsProviderProps) {

  const { reactSyncUser } = parseCookies()

  const [user, setUser] = useState<userData | null>(null)
  const [authLoading, setAuthLoading] = useState(false)
  const [appLoading, setAppLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const signIn = async (email: string, password: string) => {
    setAuthLoading(true)
    await api.get(`/users/?email=${email}`).then(response => {
      
      if (response.data.length > 0 && response.data[0].password === password) {
        
        setUser(response.data[0])
        toast.success("Login feito com sucesso")
      } else {
        toast.error("Usuário ou senha invalidos")
      }
    }).catch(err => console.log(err)).finally(
      () => setAuthLoading(false)
    )

    


    nookies.set(undefined, 'reactSyncUser', JSON.stringify({ email }), { path: '/' });
  }

  useEffect(() => {
    if (reactSyncUser) {
      setUser(JSON.parse(reactSyncUser))
    }
    setAppLoading(false)
  }, [reactSyncUser])

  return (
    <AuthContext.Provider value={{
      appLoading,
      authLoading,
      signIn,
      user
    }}>
      {children}
    </AuthContext.Provider>
  )  
}