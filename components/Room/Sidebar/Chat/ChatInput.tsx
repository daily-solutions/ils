import React, { memo, useCallback, useState } from 'react';

import { useChat } from '../../../../hooks/useChat';
import { Box } from '../../../../ui/Box';
import { Input } from '../../../../ui/Input';

export const ChatInput = memo(() => {
  const [message, setMessage] = useState<string>('');

  const { sendMessage } = useChat();

  const handleSendMessage = useCallback(() => {
    if (message === '') return;
    sendMessage(message);
    setMessage('');
  }, [message, sendMessage]);

  return (
    <Box css={{ p: '$3 $4', marginTop: 'auto' }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <Input
          autoFocus
          iconRight="arrow_right"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
      </form>
    </Box>
  );
});

ChatInput.displayName = 'ChatInput';
