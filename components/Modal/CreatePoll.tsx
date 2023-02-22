import { usePoll } from '../../contexts/UIState';
import { usePolls } from '../../hooks/usePolls';
import { Button } from '../../ui/Button';
import { Divider } from '../../ui/Divider';
import { Flex } from '../../ui/Flex';
import { Input } from '../../ui/Input';
import { Label } from '../../ui/Label';
import { Modal } from '../../ui/Modal';

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
