import { styled } from '../styles/stitches.config';

export const Label = styled('label', {
  fontWeight: '$semibold',
  color: '$baseText',

  variants: {
    size: {
      sm: {
        fontSize: '$1',
      },
      md: {
        fontSize: '$3',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
