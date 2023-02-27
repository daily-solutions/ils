import { usePolls } from '../../hooks/usePolls';
import { usePoll } from '../../state';
import { Button, Divider, Flex, Input, Label, Modal } from '../../ui';

export const CreatePoll = () => {
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
    <Modal open={show} onClose={setShow} title="Create poll">
      <Flex css={{ flexFlow: 'column wrap', rowGap: '$5' }}>
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
        <Divider />
        <Flex css={{ gap: '$2', justifyContent: 'flex-end' }}>
          <Button variant="outline" onClick={cancelPoll}>
            Cancel
          </Button>
          <Button disabled={!isValidPoll} onClick={createPoll}>
            Create poll
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};
