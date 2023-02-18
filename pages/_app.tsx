import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

import { globalStyles } from '../styles/stitches.config';
import { ToastProvider } from '../ui/Toast';

function MyApp({ Component, pageProps }: AppProps) {
	globalStyles();
	return (
		<RecoilRoot>
			<ToastProvider>
				<title>Daily ILS Demo</title>
				<Component {...pageProps} />
			</ToastProvider>
		</RecoilRoot>
	);
}

export default MyApp;
