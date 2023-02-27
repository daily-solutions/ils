import React, { useState } from 'react';

import { useReactions } from '../../../hooks/useReactions';
import { Box, Icon } from '../../../ui';
import { TrayButton } from '../../TrayButton';
import { EmojiReactionsPopover } from '../EmojiReactionsPopover';

export const ReactionsControl = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { react } = useReactions();

  return (
    <EmojiReactionsPopover open={open} setOpen={setOpen} onEmojiClick={react}>
      <Box>
        <TrayButton muted={open} mutedVariant="inverse">
          <Icon icon="heart" width={16} height={15.3} color="#2B3F56" />
        </TrayButton>
      </Box>
    </EmojiReactionsPopover>
  );
};
