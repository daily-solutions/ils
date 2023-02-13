import { DailyProvider } from '@daily-co/daily-react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';

import { Layout } from '../components/Layout';
import { ToastProvider } from '../contexts/ToastProvider';
import { Loader } from '../ui/Loader';

const Home: NextPage = () => {
	const router = useRouter();
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		if (!router.isReady) return;

		setToken((router.query?.['t'] as string) ?? '');
	}, [router.isReady, router.query]);

	return token !== null ? (
		<RecoilRoot>
			<DailyProvider
				url={`https://${process.env.NEXT_PUBLIC_DAILY_DOMAIN}.daily.co/${process.env.NEXT_PUBLIC_DAILY_ROOM}`}
				token={token}
				dailyConfig={{
					avoidEval: true,
					experimentalChromeVideoMuteLightOff: true,
					useDevicePreferenceCookies: true,
				}}
			>
				<ToastProvider>
					<Layout />
				</ToastProvider>
			</DailyProvider>
		</RecoilRoot>
	) : (
		<Loader />
	);
};

export default Home;
