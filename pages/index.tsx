import DailyIframe, { DailyCall } from '@daily-co/daily-js';
import { DailyProvider } from '@daily-co/daily-react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Layout } from '../components/Layout';
import { Loader } from '../ui/Loader';

const Home: NextPage = () => {
	const router = useRouter();
	const [callObject, setCallObject] = useState<DailyCall | null>(null);

	useEffect(() => {
		if (callObject || !router.isReady) return;

		const token = (router.query?.['t'] as string) ?? '';
		const co = DailyIframe.createCallObject({
			url: `https://${process.env.NEXT_PUBLIC_DAILY_DOMAIN}.daily.co/${process.env.NEXT_PUBLIC_DAILY_ROOM}`,
			token,
			subscribeToTracksAutomatically: false,
			dailyConfig: {
				avoidEval: true,
				experimentalChromeVideoMuteLightOff: true,
				useDevicePreferenceCookies: true,
			},
		});
		setCallObject(co);
	}, [callObject, router.isReady, router.query]);

	useEffect(() => {
		return () => {
			callObject?.destroy();
		};
	}, [callObject]);

	if (!callObject) return <Loader />;

	return (
		<DailyProvider callObject={callObject}>
			<Layout />
		</DailyProvider>
	);
};

export default Home;
