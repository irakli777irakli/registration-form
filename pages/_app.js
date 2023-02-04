import Layout from '@/components/Layout'
import { AppProvider } from '@/context'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
  </AppProvider>
  )
}
