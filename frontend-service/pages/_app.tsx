import '../styles/globals.css';
import type { AppProps } from 'next/app';
// import Router from 'next/router';
// import withYM from 'next-ym';
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

// pass your YM code as first argument
// export default withYM('87809687', Router)(MyApp);
export default MyApp;