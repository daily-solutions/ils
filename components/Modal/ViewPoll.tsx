import { useLocalSessionId } from '@daily-co/daily-react';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';

import { useMessage, useViewPoll } from '../../contexts/UIState';
import { usePolls } from '../../hooks/usePolls';
import Poll from '../../public/poll.svg';
import { Box } from '../../ui/Box';
import { Button } from '../../ui/Button';
import { Flex } from '../../ui/Flex';
import { Icon } from '../../ui/Icon';
import { Modal } from '../../ui/Modal';
import { Progress } from '../../ui/Progress';
import { Text } from '../../ui/Text';

interface Props {
  option: string;
  onVote: (option: string) => void;
  selectedVote: boolean;
}

interface PollResultsProps {
  option: string;
  totalVotes: number;
  votes: number;
}

const votePercentage = (votes: number, totalVotes: number) => {
  const percentage = Math.round((votes / totalVotes) * 100);
  return isNaN(percentage) ? 0 : percentage;
};

const PollResult = ({ option, totalVotes, votes }: PollResultsProps) => {
  return (
    <Flex
      css={{
        flexFlow: 'column wrap',
        gap: '$3',
      }}
    >
      <Text>{option}</Text>
      <Flex css={{ alignItems: 'center', gap: '$2' }}>
        <Progress value={votes / totalVotes} css={{ width: '100%' }} />
        <Text>{votePercentage(votes, totalVotes)}%</Text>
      </Flex>
    </Flex>
  );
};

const PollOption = ({ onVote, option, selectedVote }: Props) => {
  return (
    <Flex
      css={{
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '$5',
      }}
    >
      <Text>{option}</Text>
      <Button
        size="small"
        onClick={() => onVote(option)}
        variant={selectedVote ? 'outline' : 'primary'}
      >
        {selectedVote ? (
          <Icon icon="check" css={{ color: '$primary' }} />
        ) : (
          'Vote'
        )}
      </Button>
    </Flex>
  );
};

export const ViewPoll = () => {
  const localSessionId = useLocalSessionId();
  const [viewPoll, setViewPoll] = useViewPoll();
  const message = useMessage(viewPoll as string);

  const [vote, setVote] = useState<string | null>(null);

  const { voteToPoll } = usePolls();

  const { options, question, votes } = useMemo(() => {
    return {
      options: message?.poll?.options ?? [],
      question: message?.poll?.question ?? '',
      votes: message?.poll?.votes ?? {},
    };
  }, [message]);

  const myVote = useMemo(() => {
    const votes = { ...message?.poll?.votes };
    return Object.keys(votes).find((key) =>
      votes[key].includes(localSessionId as string)
    );
  }, [localSessionId, message?.poll?.votes]);

  const votesCount = useMemo(
    () =>
      Object.values(votes ?? {}).reduce((sum, votes) => sum + votes.length, 0),
    [votes]
  );

  return (
    <Modal
      open={!!viewPoll}
      onClose={() => setViewPoll(null)}
      title={
        <Flex css={{ flexFlow: 'column wrap', rowGap: '$2' }}>
          <Flex css={{ alignItems: 'center', gap: '$2' }}>
            <Image src={Poll} alt="poll" />
            <Text
              css={{
                fontWeight: '$semibold',
                textTransform: 'uppercase',
                fontSize: '10px',
                color: '$orange',
              }}
            >
              Poll
            </Text>
          </Flex>
          {question}
          <Text size={0}>
            {votesCount} {votesCount === 1 ? 'vote' : 'votes'}
          </Text>
        </Flex>
      }
    >
      <>
        {!myVote ? (
          <Box>
            <Flex css={{ flexFlow: 'column wrap', gap: '$5', mb: '$6' }}>
              {options.map((o) => (
                <PollOption
                  option={o}
                  key={o}
                  selectedVote={o === vote}
                  onVote={(option) => setVote(option)}
                />
              ))}
            </Flex>
            <Flex
              css={{
                alignItems: 'center',
                justifyContent: 'space-between',
                py: '$5',
                borderTop: '1px solid $disabled',
              }}
            >
              <Text role="button" css={{ color: '$muted', cursor: 'pointer' }}>
                Skip (show results)
              </Text>
              <Button
                disabled={!vote}
                onClick={() => voteToPoll(viewPoll as string, vote as string)}
              >
                Confirm selection
              </Button>
            </Flex>
          </Box>
        ) : (
          <Flex css={{ flexFlow: 'column wrap', gap: '$5', mb: '$6' }}>
            {options.map((o) => (
              <PollResult
                option={o}
                key={o}
                totalVotes={votesCount}
                votes={votes[o]?.length}
              />
            ))}
          </Flex>
        )}
      </>
    </Modal>
  );
};
