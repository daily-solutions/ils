import { useIsOnStage } from '../../../hooks/useIsOnStage';
import { Box, Icon } from '../../../ui';
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
            <Icon icon="settings" size={16} color="#2B3F56" />
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
