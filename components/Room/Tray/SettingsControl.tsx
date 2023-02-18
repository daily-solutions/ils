import { useIsOnStage } from '../../../hooks/useIsOnStage';
import { Box } from '../../../ui/Box';
import { Icon } from '../../../ui/Icon';
import { Popover, PopoverContent, PopoverTrigger } from '../../../ui/Popover';
import { Devices } from '../../Haircheck/Devices';
import { TrayButton } from '../../TrayButton';

export const SettingsControl = () => {
	const isOnStage = useIsOnStage();

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Box>
					<TrayButton>
						<Icon icon="settings" />
					</TrayButton>
				</Box>
			</PopoverTrigger>
			<PopoverContent>
				<Box css={{ p: '$2 $4' }}>
					<Devices audioVideo={isOnStage} />
				</Box>
			</PopoverContent>
		</Popover>
	);
};
