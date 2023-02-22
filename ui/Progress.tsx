import { styled } from '../styles/stitches.config';

export const Progress = styled('progress', {
  appearance: 'none',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  width: '100%',
  height: '12px',

  br: '$m',
  '&::-webkit-progress-bar': { br: '$m' },
  '&::-moz-progress-bar': { br: '$m' },
  '&::-webkit-progress-value': { br: '$m' },

  variants: {
    color: {
      primary: {
        color: '$primary',
        '&::-webkit-progress-bar': { backgroundColor: '$primary' },
        '&::-moz-progress-bar': { backgroundColor: '$primary' },
        '&::-webkit-progress-value': { backgroundColor: '$primary' },
      },
      secondary: {
        color: '$secondary',
        '&::-webkit-progress-bar': { backgroundColor: '$secondary' },
        '&::-moz-progress-bar': { backgroundColor: '$secondary' },
        '&::-webkit-progress-value': { backgroundColor: '$secondary' },
      },
      cyan: {
        color: '$cyanLightText',
        '&::-webkit-progress-bar': { backgroundColor: '$cyanLightText' },
        '&::-moz-progress-bar': { backgroundColor: '$cyanLightText' },
        '&::-webkit-progress-value': { backgroundColor: '$cyanLightText' },
      },
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});
