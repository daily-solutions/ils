import React from 'react';

import { Flex, Text } from '../../ui';
import { Button, ButtonVariant } from '../../ui/Button';

interface Props extends React.ComponentProps<typeof Button> {
  muted?: boolean;
  mutedVariant?: ButtonVariant;
  variant?: ButtonVariant;
  label?: string;
}

export const TrayButton = ({
  children,
  label = undefined,
  muted = false,
  mutedVariant = 'danger',
  variant = 'secondary',
  ...rest
}: React.PropsWithChildren<Props>) => {
  return label ? (
    <Flex
      css={{
        gap: '$2',
        flexFlow: 'column wrap',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Button
        {...rest}
        size="icon"
        variant={muted ? mutedVariant : variant}
        css={{ borderRadius: '50%' }}
      >
        {children}
      </Button>
      <Text size={1} css={{ color: 'inherit', fontWeight: '$semibold' }}>
        {label}
      </Text>
    </Flex>
  ) : (
    <Button
      {...rest}
      size="icon"
      variant={muted ? mutedVariant : variant}
      css={{
        borderRadius: '50%',
        color: muted || variant === 'transparent' ? 'none' : '$baseText',
      }}
    >
      {children}
    </Button>
  );
};
