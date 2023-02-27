import type { AppProps } from 'next/app';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';

import { globalStyles } from '../styles/stitches.config';
import { ToastProvider } from '../ui';

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles();
  return (
    <RecoilRoot>
      <ToastProvider>
        <Head>
          <title>Interactive Live Streaming</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
        </Head>
        <Component {...pageProps} />
      </ToastProvider>
    </RecoilRoot>
  );
}

export default MyApp;
