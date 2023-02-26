import { GetServerSidePropsContext } from 'next';
import { fetch } from 'next/dist/compiled/@edge-runtime/primitives/fetch';

import { Layout } from '../components/Layout';

interface Props {
  isConfigured: boolean;
  domain: string;
  room: string;
  token: string;
}

const Secret = ({ domain, isConfigured, room, token }: Props) => {
  return (
    <Layout
      domain={domain}
      isConfigured={isConfigured}
      room={room}
      token={token}
    />
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const baseUrl = `${protocol}://${req.headers.host}`;

  const dailyRes = await fetch(`${baseUrl}/api/token`, {
    method: 'POST',
  });
  const { token } = await dailyRes.json();
  return {
    props: {
      isConfigured:
        !!process.env.NEXT_PUBLIC_DAILY_DOMAIN &&
        !!process.env.NEXT_PUBLIC_DAILY_ROOM &&
        !!process.env.DAILY_API_KEY,
      domain: process.env.NEXT_PUBLIC_DAILY_DOMAIN,
      room: process.env.NEXT_PUBLIC_DAILY_ROOM,
      token,
    },
  };
}

export default Secret;
