import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NextHeader from '../components/NextHeader';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextHeader />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
