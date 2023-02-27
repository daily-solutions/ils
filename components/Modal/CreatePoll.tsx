import React from 'react';

import { useMediaQuery } from '../../hooks/useMediaQuery';
import { usePolls } from '../../hooks/usePolls';
import { usePoll } from '../../state';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Flex,
  Input,
  Label,
} from '../../ui';

export const CreatePoll = () => {
  const isMobile = useMediaQuery('(max-width: 480px)');
  const [show, setShow] = usePoll();
  const {
    cancelPoll,
    createPoll,
    handleOptionChange,
    handleQuestionChange,
    isValidPoll,
    options,
    question,
    validateOptions,
  } = usePolls();

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent title="Create poll">
        <Box css={{ p: '$5' }}>
          <Flex css={{ flexFlow: 'column wrap', rowGap: '$2' }}>
            <Label>Question</Label>
            <Input
              autoFocus
              value={question}
              onChange={(e) => handleQuestionChange(e.target.value)}
              placeholder="Enter your question"
            />
          </Flex>
          <Flex css={{ flexFlow: 'column wrap', rowGap: '$2' }}>
            <Label>Options</Label>
            {options.map((option, index) => (
              <Input
                aria-invalid={validateOptions(option, index)}
                value={option}
                key={index}
                placeholder="Enter your option"
                onChange={(e) => handleOptionChange(e.target.value, index)}
              />
            ))}
          </Flex>
        </Box>
        <Divider />
        <Flex
          css={{
            p: '$4 $5',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '$2',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            variant="outline"
            onClick={cancelPoll}
            fullWidth={isMobile}
            css={{ order: isMobile ? 1 : 0 }}
          >
            Cancel
          </Button>
          <Button
            disabled={!isValidPoll}
            onClick={createPoll}
            fullWidth={isMobile}
          >
            Create poll
          </Button>
        </Flex>
      </DialogContent>
    </Dialog>
  );
};
