import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NextHeader from '../components/Next/NextHeader';
import { AuthProvider } from '../context/AuthProvider';
import { SnackbarProvider } from 'notistack';
import { AuthGuard } from '../guards/AuthGuard';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <NextHeader />
      <AuthProvider>
        {Component.requireAuth ? (
          <AuthGuard>
            <Component {...pageProps} />
          </AuthGuard>
        ) : (
          // public page
          <Component {...pageProps} />
        )}
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default MyApp;
