import { styled } from '../styles/stitches.config';
import { Box } from './Box';
import { Icon } from './Icon';

export const StyledInput = styled('input', {
  appearance: 'none',
  width: '100%',
  br: '$default',
  '-webkit-appearance': 'none',
  boxSizing: 'border-box',
  display: 'inline-block',
  fontFamily: 'inherit',
  height: '$7',
  px: '$4',
  fontSize: '$2',
  lineHeight: '$none',
  transition: '$default',
  border: '1px solid $border',
  backgroundColor: '$background',
  color: '$text',

  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },
  '&[type=number]': {
    '-moz-appearance': 'textfield',
  },

  '&[aria-invalid=true]': {
    border: '1px solid $dangerText',
  },

  '&[disabled], > option[disabled]': {
    backgroundColor: '$disabled',
    color: '$muted',
    cursor: 'not-allowed',
  },
  '&::placeholder': {
    color: '$border',
    opacity: 1,
  },

  '&:hover': {
    outline: 'none',
  },

  '&:focus': {
    outline: 'none',
  },
});

const StyledIconButton = styled('button', {
  appearance: 'none',
  background: '$transparent',
  outline: 'none',
  border: 'none',
  cursor: 'pointer',
});

interface Props extends React.ComponentProps<typeof StyledInput> {
  iconRight?: Icon;
  iconLeft?: Icon;
  onIconLeftClick?: () => void;
  onIconRightClick?: () => void;
}

export const Input = ({
  iconLeft = undefined,
  iconRight = undefined,
  onIconLeftClick = undefined,
  onIconRightClick = undefined,
  ...props
}: Props) => {
  if (iconLeft || iconRight) {
    return (
      <Box css={{ position: 'relative', width: '100%' }}>
        {iconLeft && (
          <Box
            css={{
              position: 'absolute',
              left: 5,
              top: '25px',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
            }}
          >
            <StyledIconButton
              type={onIconLeftClick ? 'button' : 'submit'}
              onClick={() => onIconLeftClick?.()}
            >
              <Icon icon={iconLeft} />
            </StyledIconButton>
          </Box>
        )}
        <StyledInput
          {...props}
          css={{ pl: iconLeft ? 35 : '$4', pr: iconRight ? 35 : '$4' }}
        />
        {iconRight && (
          <Box
            css={{
              position: 'absolute',
              right: 5,
              top: '25px',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
            }}
          >
            <StyledIconButton
              type={onIconRightClick ? 'button' : 'submit'}
              onClick={() => onIconRightClick?.()}
            >
              <Icon icon={iconRight} />
            </StyledIconButton>
          </Box>
        )}
      </Box>
    );
  }
  return <StyledInput {...props} />;
};
