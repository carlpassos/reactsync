import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { chakraTheme } from '../theme/chakraTheme'

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../context/authContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={chakraTheme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      <ToastContainer />
    </ChakraProvider>
    )
}

export default MyApp
