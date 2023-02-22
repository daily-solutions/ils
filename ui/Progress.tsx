import { styled } from '../styles/stitches.config';

export const Progress = styled('progress', {
  appearance: 'none',
  width: '100%',
  height: '$1',

  color: '$primary',
  '&::-moz-progress-bar': { background: '$primary' },
  '&::-webkit-progress-value': { background: '$primary' },
  br: '$default',
});
