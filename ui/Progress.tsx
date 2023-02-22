import { styled } from '../styles/stitches.config';

export const Progress = styled('progress', {
  appearance: 'none',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  width: '100%',
  height: '12px',

  br: '$default',
  color: '$primary',
  '&::-moz-progress-bar': { backgroundColor: '$primary' },
  '&::-webkit-progress-value': { backgroundColor: '$primary' },
});
