import { GetServerSidePropsContext } from 'next';

import { Layout } from '../components/Layout';

interface Props {
  isConfigured: boolean;
  domain: string;
  room: string;
  token: string;
}

const Home = ({ domain, isConfigured, room, token }: Props) => {
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
  return {
    props: {
      isConfigured:
        !!process.env.NEXT_PUBLIC_DAILY_DOMAIN &&
        !!process.env.NEXT_PUBLIC_DAILY_ROOM &&
        !!process.env.DAILY_API_KEY,
      domain: process.env.NEXT_PUBLIC_DAILY_DOMAIN,
      room: process.env.NEXT_PUBLIC_DAILY_ROOM,
      token: context.query?.['t'] ?? '',
    },
  };
}

export default Home;
