import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import React from 'react';

import { keyframes, styled } from '../styles/stitches.config';

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const contentStyles = {
  minWidth: 220,
  zIndex: 101,
  borderRadius: '$default',
  boxSizing: 'border-box',
  position: 'relative',
  backgroundColor: '$background',
  padding: '$2 0',
  color: '$baseText',
  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
  '@media (prefers-reduced-motion: no-preference)': {
    animationDuration: '400ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform, opacity',
    '&[data-state="open"]': {
      '&[data-side="top"]': { animationName: slideDownAndFade },
      '&[data-side="right"]': { animationName: slideLeftAndFade },
      '&[data-side="bottom"]': { animationName: slideUpAndFade },
      '&[data-side="left"]': { animationName: slideRightAndFade },
    },
  },
};

const StyledContent = styled(DropdownMenuPrimitive.Content, {
  ...contentStyles,
});

const StyledArrow = styled(DropdownMenuPrimitive.Arrow, {
  fill: '$background',
});

const Content = ({
  children,
  ...props
}: React.PropsWithChildren<DropdownMenuPrimitive.DropdownMenuContentProps>) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <StyledContent {...props}>
        {children}
        <StyledArrow />
      </StyledContent>
    </DropdownMenuPrimitive.Portal>
  );
};

const itemStyles = {
  all: 'unset',
  lineHeight: 1,
  margin: '0 $2',
  color: '$baseText',
  display: 'flex',
  fontSize: '$2',
  alignItems: 'center',
  position: 'relative',
  userSelect: 'none',
  padding: '$2 $3',
  borderRadius: '$xs',

  '&[data-disabled]': {
    color: '$muted',
    pointerEvents: 'none',
  },

  '&:hover, &[data-highlighted]': {
    backgroundColor: '$primary',
    color: '$primaryText',
    cursor: 'pointer',
  },
};

const StyledItem = styled(DropdownMenuPrimitive.Item, { ...itemStyles });

interface MenuItem {
  label: string;
  onSelect: () => void;
  disabled?: boolean;
}

interface Props {
  items: MenuItem[];
}

export const Menu = ({ children, items }: React.PropsWithChildren<Props>) => {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        {children}
      </DropdownMenuPrimitive.Trigger>
      <Content>
        {items.map(({ label, ...rest }) => (
          <StyledItem key={label} {...rest}>
            {label}
          </StyledItem>
        ))}
      </Content>
    </DropdownMenuPrimitive.Root>
  );
};
