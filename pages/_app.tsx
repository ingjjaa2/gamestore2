import '../sass/_setting.scss';
import type { AppProps } from 'next/app'
import AppLayout from '../theme';
import {AppContext,useContextValue} from '../context/appContext';
import {ApolloProvider} from '@apollo/client';
import {apolloClient} from '../Apollo/apoloClient';



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContext.Provider value={useContextValue()} >
      <ApolloProvider client={apolloClient}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
      </ApolloProvider>
    </AppContext.Provider>
  )
}
export default MyApp
