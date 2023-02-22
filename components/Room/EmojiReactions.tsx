import { keyframes, styled } from '../../styles/stitches.config';

const emerge = keyframes({
  to: {
    bottom: '85%',
    opacity: '0',
  },
});

const wiggle1 = keyframes({
  from: {
    marginLeft: '-50px',
  },
  to: {
    marginLeft: '50px',
  },
});

const wiggle2 = keyframes({
  from: {
    marginLeft: '50px',
  },
  to: {
    marginLeft: '-50px',
  },
});

const StyledEmojiReactions = styled('div', {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  overflow: 'hidden',
  pointerEvents: 'none',
  userSelect: 'none',
  zIndex: 99,
  minHeight: '100dvh',
  minWidth: '100dvw',

  '.emoji': {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    fontSize: '48px',
    lineHeight: 1,
    width: '48px',
    height: '48px',
  },
  '.wiggle-1': {
    animation: `${emerge} 3s forwards, ${wiggle1} 1s ease-in-out infinite alternate`,
  },
  '.wiggle-2': {
    animation: `${emerge} 3s forwards, ${wiggle2} 1s ease-in-out infinite alternate`,
  },
});

export const EmojiReactions = () => {
  return <StyledEmojiReactions id="reactions" />;
};
