import DailyIframe, { DailyCall } from '@daily-co/daily-js';
import { DailyProvider } from '@daily-co/daily-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Layout } from '../components/Layout';
import { Loader } from '../ui/Loader';

const NotConfigured = dynamic(() => import('../components/NotConfigured'), {
  loading: () => <Loader />,
});

interface Props {
  isConfigured: boolean;
  domain: string;
  room: string;
}

const Secret = ({ domain, isConfigured, room }: Props) => {
  const router = useRouter();
  const [callObject, setCallObject] = useState<DailyCall | null>(null);

  useEffect(() => {
    if (callObject || !router.isReady || !domain || !room) return;

    const token = (router.query?.['t'] as string) ?? '';
    const co = DailyIframe.createCallObject({
      url: `https://${domain}.daily.co/${room}`,
      token,
      subscribeToTracksAutomatically: true,
      dailyConfig: {
        avoidEval: true,
        experimentalChromeVideoMuteLightOff: true,
        useDevicePreferenceCookies: true,
        micAudioMode: 'music',
      },
    });
    setCallObject(co);
  }, [callObject, domain, room, router.isReady, router.query]);

  useEffect(() => {
    return () => {
      callObject?.destroy();
    };
  }, [callObject]);

  if (!isConfigured) return <NotConfigured />;

  if (!callObject) return <Loader />;

  return (
    <DailyProvider callObject={callObject}>
      <Layout />
    </DailyProvider>
  );
};

export async function getStaticProps() {
  return {
    props: {
      isConfigured:
        !!process.env.NEXT_PUBLIC_DAILY_DOMAIN &&
        !!process.env.NEXT_PUBLIC_DAILY_ROOM &&
        !!process.env.DAILY_API_KEY,
      domain: process.env.NEXT_PUBLIC_DAILY_DOMAIN,
      room: process.env.NEXT_PUBLIC_DAILY_ROOM,
    },
  };
}

export default Secret;
