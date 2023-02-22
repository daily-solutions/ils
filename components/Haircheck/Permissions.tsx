import { useDevices } from '@daily-co/daily-react';
import { useMemo } from 'react';

import { Flex } from '../../ui/Flex';
import { Text } from '../../ui/Text';

export const Permissions = () => {
  const { camState, micState } = useDevices();
  const { subText, text } = useMemo(() => {
    if (camState === 'blocked' && micState === 'blocked') {
      return {
        text: 'Unblock your camera and microphone',
        subText: "Click the camera icon in your browser's address bar",
      };
    }
    return {
      text: 'Checking permissions for camera & microphone',
      subText: 'Select “Allow” to use your camera and microphone',
    };
  }, [camState, micState]);

  return (
    <Flex css={{ pb: `${100 / (16 / 9)}%`, position: 'relative' }}>
      <Flex
        css={{
          flexFlow: 'column wrap',
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          gap: '$3',
        }}
      >
        <Text>{text}</Text>
        <Text css={{ color: '$muted' }}>{subText}</Text>
      </Flex>
    </Flex>
  );
};
