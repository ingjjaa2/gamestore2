import '../sass/styles.scss';
import '../sass/animate.min.css';
import type { AppProps } from 'next/app'
import AppLayout from '../theme';
import {AppContext,useContextValue} from '../context/appContext';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <AppContext.Provider value={useContextValue()} >
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </AppContext.Provider>
  )
}
export default MyApp
