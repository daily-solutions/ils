import type { CSS } from '@stitches/react';
import React from 'react';

import { styled } from '../styles/stitches.config';

const StyledButton = styled('button', {
  // Reset
  all: 'unset',
  boxSizing: 'border-box',
  userSelect: 'none',
  '&::before': {
    boxSizing: 'border-box',
  },
  '&::after': {
    boxSizing: 'border-box',
  },
  display: 'flex',
  flexShrink: 0,
  lineHeight: '$normal',
  border: 'none',
  cursor: 'pointer',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  br: '$default',

  fontFamily: 'inherit',
  fontSize: '$2',
  fontWeight: '$semibold',

  '&:disabled': {
    backgroundColor: '$disabled',
    color: '$muted',
    cursor: 'not-allowed',
  },

  variants: {
    variant: {
      outline: {
        border: '1px solid $border',
        background: 'transparent',
        color: '$baseText',
      },
      primary: {
        backgroundColor: '$primary',
        color: '$primaryText',
      },
      secondary: {
        backgroundColor: '$secondary',
        color: '$secondaryText',
      },
      danger: {
        backgroundColor: '$danger',
        color: '$dangerText',
      },
      inverse: {
        backgroundColor: '$muted',
        color: '$background',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$baseText',
      },
      cyan: {
        backgroundColor: '$cyanLight',
        color: '$cyanLightText',
      },
      warning: {
        backgroundColor: '$orangeLight',
        color: '$orange',
      },
      transparent: {
        backgroundColor: 'rgba(18, 26, 36, 0.3)',
        color: '$background',
      },
    },

    size: {
      small: {
        height: '$6',
        px: '$5',
        fontSize: '$1',
        lineHeight: '$none',
        br: '$sm',
      },
      medium: {
        height: '$7',
        px: '$6',
        fontSize: '$2',
        lineHeight: '$none',
        br: '$sm',
      },
      icon: {
        height: '$trayButton',
        width: '$trayButton',
      },
      xs: {
        height: '24px',
        br: '$none',
      },
      reaction: {
        height: '$4',
        p: '$4 $2',
        width: 'auto',
      },
      pagination: {
        p: '$1',
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
    },
    rounded: {
      true: {
        br: '$pill',
      },
    },
  },
  defaultVariants: {
    size: 'medium',
    fullWidth: false,
    variant: 'primary',
  },
});

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'inverse'
  | 'ghost'
  | 'cyan'
  | 'outline'
  | 'transparent'
  | 'warning';

interface Props extends React.ComponentPropsWithRef<'button'> {
  size?: 'small' | 'medium' | 'icon' | 'xs' | 'reaction' | 'pagination';
  rounded?: boolean;
  variant?: ButtonVariant;
  disabled?: boolean;
  fullWidth?: boolean;
  css?: CSS;
}

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<Props>
>(
  (
    {
      children,
      css,
      disabled,
      fullWidth = false,
      rounded = false,
      size = 'medium',
      variant = 'primary',
      ...rest
    },
    ref
  ) => {
    return (
      <StyledButton
        variant={variant}
        size={size}
        disabled={disabled}
        fullWidth={fullWidth}
        ref={ref}
        rounded={rounded}
        css={css}
        {...rest}
      >
        {children}
      </StyledButton>
    );
  }
);

Button.displayName = 'Button';
