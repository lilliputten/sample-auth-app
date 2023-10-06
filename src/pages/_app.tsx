import { AppProps } from 'next/app';

import '@/core/global/global-includes';

import { AppWrapper } from '@/core/app/AppWrapper';

import '@/core/global/global-styles.scss';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <AppWrapper>
      <Component {...pageProps} />
    </AppWrapper>
  );
};

export default App;
