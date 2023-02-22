import { styled } from '../styles/stitches.config';

export const Select = styled('select', {
  appearance: 'none',
  width: '100%',
  br: '$default',
  boxShadow: 'none', // prevent default iOS default styling
  boxSizing: 'border-box',
  cursor: 'pointer',
  display: 'inline-block',
  fontFamily: 'inherit',
  height: '$7',
  px: '$4',
  fontSize: '$2',
  transition: '$default',
  backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 120 120' width='12' height='12' xmlns='http://www.w3.org/2000/svg'><g><path d='m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z' fill='currentColor'/></g></svg>")!important`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right $sizes$3 center',
  border: '1px solid $secondary',
  backgroundColor: '$background',
  color: '$text',

  '&[disabled], > option[disabled]': {
    backgroundColor: '$disabled',
    color: '$muted',
    cursor: 'not-allowed',
  },
  '&::placeholder': {
    color: '$secondaryText',
    opacity: 1,
  },
  '&:hover': {
    borderColor: '$primary',
    backgroundColor: '$background',
    outline: 'none',
  },

  '&:focus': {
    borderColor: '$primary',
    color: '$text',
    outline: 'none',
  },
});
