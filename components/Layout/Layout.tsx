import DailyIframe, { DailyCall } from '@daily-co/daily-js';
import { DailyProvider } from '@daily-co/daily-react';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

import { Loader } from '../../ui';
import { CallUI } from './CallUI';

const NotConfigured = dynamic(() => import('../NotConfigured'), {
  loading: () => <Loader />,
  ssr: false,
});

interface Props {
  domain: string;
  isConfigured: boolean;
  room: string;
  token?: string;
}

export const Layout = ({ domain, isConfigured, room, token = '' }: Props) => {
  const [callObject, setCallObject] = useState<DailyCall | null>(null);

  useEffect(() => {
    if (callObject || !domain || !room) return;

    const co = DailyIframe.createCallObject({
      url: `https://${domain}.daily.co/${room}`,
      token,
      subscribeToTracksAutomatically: true,
      dailyConfig: {
        experimentalChromeVideoMuteLightOff: true,
        useDevicePreferenceCookies: true,
        micAudioMode: {
          bitrate: 256000,
          stereo: true,
        },
      },
    });
    setCallObject(co);
  }, [callObject, domain, room, token]);

  useEffect(() => {
    // cleanup function (destroys callObject on unmount)
    return () => {
      callObject?.destroy();
    };
  }, [callObject]);

  if (!isConfigured) return <NotConfigured />;

  if (!callObject) return <Loader />;

  return (
    <DailyProvider callObject={callObject}>
      <CallUI />
    </DailyProvider>
  );
};
