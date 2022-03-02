import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NextHeader from '../components/NextHeader';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextHeader />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
