import { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0/client';

import '@/core/global/global-includes';

import { AppWrapper } from '@/core/app/AppWrapper';

import '@/core/global/global-styles.scss';

console.log('[_app:DEBUG]', {
  AUTH0_SECRET: process.env.AUTH0_SECRET,
});

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <UserProvider>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </UserProvider>
  );
};

export default App;
