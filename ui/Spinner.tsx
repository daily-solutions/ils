import { VariantProps } from '@stitches/react';
import React from 'react';

import { keyframes, styled } from '../styles/stitches.config';

const pulse = keyframes({
  '0%': { transform: 'scale(1); opacity: 1' },
  '45%': { transform: 'scale(0.1); opacity: 0.7' },
  '80%': { transform: 'scale(1); opacity: 1' },
});

export const Dots = styled('span', {
  display: 'inline-block',

  variants: {
    size: {
      medium: {
        height: 11,
      },
      large: {
        height: 18,
      },
    },
  },
});

export const Dot = styled('span', {
  borderRadius: '100%',
  display: 'inline-block',
  animationName: `${pulse}`,
  animationTimingFunction: 'ease',
  animationFillMode: 'both',
  animationIterationCount: 'infinite',
  animationDuration: '0.75s',
  backgroundColor: '$baseText',

  variants: {
    size: {
      medium: {
        width: 5,
        height: 5,
        margin: 3,
      },

      large: {
        width: 10,
        height: 10,
        margin: 4,
      },
    },
  },

  defaultVariants: {
    size: 'large',
  },
});

interface Props extends VariantProps<typeof Dot> {
  dotColor?: string;
}

export const Spinner: React.FC<Props> = ({ dotColor, ...rest }) => {
  return (
    <Dots size={rest.size}>
      <Dot
        css={{ '&&': { animationDelay: '0.12s', backgroundColor: dotColor } }}
        {...rest}
      />
      <Dot
        css={{ '&&': { animationDelay: '0.24s', backgroundColor: dotColor } }}
        {...rest}
      />
      <Dot
        css={{ '&&': { animationDelay: '0.36s', backgroundColor: dotColor } }}
        {...rest}
      />
    </Dots>
  );
};
