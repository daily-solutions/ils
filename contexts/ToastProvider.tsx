import React, {
	createContext,
	PropsWithChildren,
	useCallback,
	useContext,
	useState,
} from 'react';

import { Button } from '../ui/Button';
import { Flex } from '../ui/Flex';
import {
	Toast,
	ToastProvider as RadixToastProvider,
	ToastVariant,
	ToastViewport,
} from '../ui/Toast';

type BringToStage = {
	type: 'bringToStage';
	bringToStage: () => void;
};

type ToastAction = BringToStage;

interface Toast {
	id: string;
	title: string;
	description?: string;
	variant: ToastVariant;
	duration?: number;
	isShown: boolean;
	actions?: ToastAction;
}

type InputToast = {
	id?: string;
	title: string;
	description?: string;
	duration?: number;
	actions?: ToastAction;
};

interface ContextValue {
	toasts: { [key: string]: Toast };
	toaster: {
		notify(variant: ToastVariant, toast: InputToast): void;
		close(id: string): void;
		closeAll(): void;
	};
}

// @ts-ignore
const ToastContext = createContext<ContextValue>();

export const ToastProvider = ({ children }: PropsWithChildren<{}>) => {
	const [toasts, setToasts] = useState<{ [key: string]: Toast }>({});

	const notify = useCallback(
		(
			variant: ToastVariant,
			{
				id = crypto.randomUUID(),
				title,
				description = '',
				duration = 5000,
				actions = undefined,
			}: InputToast
		) => {
			setToasts((toasts) => {
				const newToast = {
					id,
					title,
					description,
					variant,
					duration,
					actions,
					isShown: true,
				};
				return { ...toasts, [newToast.id]: newToast };
			});
		},
		[]
	);

	const close = useCallback(
		(id: string) =>
			setToasts((toasts) => {
				const newToasts = { ...toasts };
				delete newToasts[id];
				return newToasts;
			}),
		[]
	);

	const closeAll = useCallback(() => setToasts({}), []);

	return (
		<ToastContext.Provider
			value={{
				toasts,
				toaster: { notify, close, closeAll },
			}}
		>
			<RadixToastProvider swipeDirection="right">
				{children}
				{Object.keys(toasts).map((id) => (
					<Toast
						{...toasts[id]}
						key={id}
						open={toasts[id].isShown}
						setOpen={() => close(id)}
					>
						{toasts[id]?.actions?.type === 'bringToStage' && (
							<Flex css={{ gap: '$2' }}>
								<Button onClick={() => toasts[id]?.actions?.bringToStage()}>
									Bring to stage
								</Button>
								<Button variant="secondary" onClick={() => close(id)}>
									Decide later
								</Button>
							</Flex>
						)}
					</Toast>
				))}
				<ToastViewport />
			</RadixToastProvider>
		</ToastContext.Provider>
	);
};

export const useToasts = () => useContext(ToastContext);
