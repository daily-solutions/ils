import * as TabsPrimitive from '@radix-ui/react-tabs';

import { styled } from '../styles/stitches.config';

const StyledTabs = styled(TabsPrimitive.Root, {
	display: 'flex',
	flexDirection: 'column',
	height: '100%',
});

const StyledList = styled(TabsPrimitive.List, {
	flexShrink: 0,
	display: 'flex',
	alignItems: 'center',
	width: '100%',
	variants: {
		variant: {
			primary: {
				background: '$secondary',
				justifyContent: 'space-evenly',
				borderRadius: '$sizes$7',
				height: '$7',
				padding: '$2',
			},
			secondary: {
				height: '$6',
				padding: '$3',
				gap: '$4',
			},
		},
	},
	defaultVariants: {
		variant: 'primary',
	},
});

const StyledTrigger = styled(TabsPrimitive.Trigger, {
	all: 'unset',
	position: 'relative',
	fontFamily: 'inherit',
	fontSize: '$2',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	fontWeight: '$semibold',
	lineHeight: 1,
	color: '$muted',
	height: '100%',
	'&:hover': { cursor: 'pointer', color: '$dark' },
	'&:focus': { position: 'relative' },

	variants: {
		variant: {
			primary: {
				width: '100%',
				'&[data-state="active"]': {
					background: '$background',
					borderRadius: '$sizes$tab',
					color: '$dark',
					boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
					paddingX: '$3',
					height: '$tab',
				},
			},
			secondary: {
				p: '$2 $3',
				'&[data-state="active"]': {
					background: '$secondary',
					color: '$dark',
					br: '$pill',
				},
			},
		},
	},

	defaultVariants: {
		variant: 'primary',
	},
});

const StyledContent = styled(TabsPrimitive.Content, {
	height: '100%',
});

// Exports
export const Tabs = StyledTabs;
export const TabsList = StyledList;
export const TabsTrigger = StyledTrigger;
export const TabsContent = StyledContent;
