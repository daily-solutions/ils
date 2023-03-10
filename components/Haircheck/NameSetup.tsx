import { useDaily } from '@daily-co/daily-react';
import Avatar from 'boring-avatars';
import React, { memo, useCallback, useMemo, useState } from 'react';

import { Box, Button, Divider, Flex, Icon, Input, Label, Text } from '../../ui';

type Avatar =
  | 'Margaret Brent'
  | 'Lucy Stone'
  | 'Mary Edwards'
  | 'Margaret Chase'
  | 'Mahalia Jackson'
  | 'Maya Angelou'
  | 'Margaret Bourke'
  | 'Eunice Kennedy'
  | 'Amelia Earhart'
  | 'Mary Baker';

const avatarNames: Avatar[] = [
  'Margaret Brent',
  'Lucy Stone',
  'Mary Edwards',
  'Margaret Chase',
  'Mahalia Jackson',
  'Maya Angelou',
  'Margaret Bourke',
  'Eunice Kennedy',
  'Amelia Earhart',
  'Mary Baker',
];

interface Props {
  hasPermission: boolean;
  onContinue: () => void;
}

export const NameSetup = memo(({ hasPermission, onContinue }: Props) => {
  const daily = useDaily();

  const [name, setName] = useState<string>('');
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar>(
    avatarNames[Math.floor(Math.random() * 10)]
  );

  const handleContinue = useCallback(async () => {
    if (!daily) return;

    await daily.setUserName(name);
    await daily.setUserData({ avatar: selectedAvatar });
    onContinue();
  }, [daily, name, onContinue, selectedAvatar]);

  const disabled = useMemo(() => name.length === 0, [name]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleContinue();
      }}
    >
      <Box>
        <Flex css={{ flexFlow: 'column wrap', rowGap: '$5', p: '$5' }}>
          <Text size={5}>Joining as {hasPermission ? 'owner' : 'viewer'}</Text>
          <Flex css={{ flexFlow: 'column wrap', rowGap: '$3' }}>
            <Label>Enter your display name</Label>
            <Input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Eg. Andrew"
            />
          </Flex>
          <Flex css={{ flexFlow: 'column wrap', rowGap: '$3' }}>
            <Label>Select avatar</Label>
            <Flex
              css={{ gap: '$3', flexFlow: 'row wrap', position: 'relative' }}
            >
              {avatarNames.map((name) => (
                <Box
                  css={{ position: 'relative', cursor: 'pointer' }}
                  onClick={() => setSelectedAvatar(name)}
                  key={name}
                >
                  <Avatar
                    size={46}
                    name={name}
                    variant="beam"
                    colors={['#1BEBB9', '#00C9DF', '#2B3F56', '#D1FBF1']}
                  />
                  {selectedAvatar === name && (
                    <Box
                      css={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: 46,
                        height: 46,
                        border: '3px solid $orange',
                        borderRadius: '50%',
                      }}
                    />
                  )}
                </Box>
              ))}
            </Flex>
          </Flex>
        </Flex>
        <Divider />
        <Box css={{ p: '$5' }}>
          <Button type="submit" fullWidth disabled={disabled}>
            <Flex
              css={{
                alignItems: 'center',
                justifyContent: 'center',
                gap: '$1',
              }}
            >
              <Text>{hasPermission ? 'Continue' : 'Join stream'}</Text>
              <Icon icon="arrow_right" />
            </Flex>
          </Button>
        </Box>
      </Box>
    </form>
  );
});

NameSetup.displayName = 'NameSetup';
