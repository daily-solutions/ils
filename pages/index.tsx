import { Layout } from '../components/Layout';

interface Props {
  isConfigured: boolean;
  domain: string;
  room: string;
}

const Home = ({ domain, isConfigured, room }: Props) => {
  return <Layout domain={domain} isConfigured={isConfigured} room={room} />;
};

export async function getStaticProps() {
  return {
    props: {
      isConfigured:
        !!process.env.NEXT_PUBLIC_DAILY_DOMAIN &&
        !!process.env.NEXT_PUBLIC_DAILY_ROOM &&
        !!process.env.DAILY_API_KEY,
      domain: process.env.NEXT_PUBLIC_DAILY_DOMAIN ?? null,
      room: process.env.NEXT_PUBLIC_DAILY_ROOM ?? null,
    },
  };
}

export default Home;
