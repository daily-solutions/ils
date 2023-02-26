import { useMediaQuery } from '../../hooks/useMediaQuery';
import Card from '../../ui/Card';
import { Flex } from '../../ui/Flex';
import { Text } from '../../ui/Text';

export const NotConfigured = () => {
  const isMobile = useMediaQuery('(max-width: 480px)');

  return (
    <Flex
      css={{
        alignItems: 'center',
        justifyContent: 'center',
        height: '100dvh',
        width: '100dvw',
        background: '$secondary',
      }}
    >
      <Card css={{ maxWidth: isMobile ? '95%' : 460 }}>
        <Flex css={{ flexFlow: 'column wrap', rowGap: '$5' }}>
          <Text size={7}>Environment variables not set</Text>
          <Text css={{ color: '$muted', lineHeight: '130%' }}>
            Please ensure you have set the following variables:{' '}
            <code>DAILY_API_KEY</code>, <code>NEXT_PUBLIC_DAILY_DOMAIN</code>{' '}
            and <code>NEXT_PUBLIC_DAILY_ROOM</code> environmental variables. An
            example can be found in the provided <code>env.example</code> file.
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
};

export default NotConfigured;
