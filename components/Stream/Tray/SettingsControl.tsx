import { useState } from 'react';

import { useIsOnStage } from '../../../hooks/useIsOnStage';
import { Box, Icon } from '../../../ui';
import { Popover, PopoverContent, PopoverTrigger } from '../../../ui/Popover';
import { Devices } from '../../Haircheck/Devices';
import { TrayButton } from '../../TrayButton';

export const SettingsControl = () => {
  const [open, setOpen] = useState<boolean>(false);
  const isOnStage = useIsOnStage();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Box>
          <TrayButton muted={open} mutedVariant="inverse">
            <Icon
              icon="settings"
              size={16}
              color={open ? 'white' : '#2B3F56'}
            />
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
