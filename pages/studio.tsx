import DailyIframe, { DailyCall } from '@daily-co/daily-js';
import { DailyProvider } from '@daily-co/daily-react';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

import { Layout } from '../components/Layout';
import { Loader } from '../ui/Loader';

const Home: NextPage = () => {
  const [callObject, setCallObject] = useState<DailyCall | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (token) return;

    const createToken = async () => {
      const dailyRes = await fetch('/api/token', {
        method: 'POST',
      });
      const { token: t } = await dailyRes.json();
      setToken(t);
    };

    createToken();
  }, [token]);

  useEffect(() => {
    if (callObject || !token) return;

    const co = DailyIframe.createCallObject({
      url: `https://${process.env.NEXT_PUBLIC_DAILY_DOMAIN}.daily.co/${process.env.NEXT_PUBLIC_DAILY_ROOM}`,
      token,
      subscribeToTracksAutomatically: true,
      dailyConfig: {
        avoidEval: true,
        experimentalChromeVideoMuteLightOff: true,
        useDevicePreferenceCookies: true,
      },
    });
    setCallObject(co);
  }, [callObject, token]);

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
