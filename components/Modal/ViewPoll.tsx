import { useLocalSessionId } from '@daily-co/daily-react';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';

import { useMediaQuery } from '../../hooks/useMediaQuery';
import { usePolls } from '../../hooks/usePolls';
import Poll from '../../public/poll.svg';
import { useMessage, useViewPoll } from '../../state';
import {
  Badge,
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  Flex,
  Icon,
  Progress,
  Text,
} from '../../ui';

interface Props {
  option: string;
  onVote: (option: string) => void;
  selectedVote: boolean;
}

interface PollResultsProps {
  option: string;
  totalVotes: number;
  votes: number;
  myVote: boolean;
}

const votePercentage = (votes: number, totalVotes: number) => {
  const percentage = Math.round((votes / totalVotes) * 100);
  return isNaN(percentage) ? 0 : percentage;
};

const PollResult = ({
  myVote,
  option,
  totalVotes,
  votes,
}: PollResultsProps) => {
  return (
    <Flex
      css={{
        flexFlow: 'column wrap',
        gap: '$3',
      }}
    >
      <Flex css={{ alignItems: 'center', gap: '$2' }}>
        <Text>{option}</Text>
        {myVote && <Badge size="xs">You voted</Badge>}
      </Flex>
      <Flex css={{ alignItems: 'center', gap: '$2' }}>
        <Progress
          color={myVote ? 'primary' : 'cyan'}
          value={1}
          css={{ width: `${votePercentage(votes, totalVotes)}%` }}
        />
        <Box
          css={{ height: 8, width: 8, background: '$secondary', br: '$round' }}
        />
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
  const isMobile = useMediaQuery('(max-width: 480px)');
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
    ) as string;
  }, [localSessionId, message?.poll?.votes]);

  const votesCount = useMemo(
    () =>
      Object.values(votes ?? {}).reduce((sum, votes) => sum + votes.length, 0),
    [votes]
  );

  return (
    <Dialog open={!!viewPoll} onOpenChange={() => setViewPoll(null)}>
      <DialogContent
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
        <Box css={{ p: '$5' }}>
          <Flex css={{ flexFlow: 'column wrap', gap: '$5', mb: '$6' }}>
            {options.map((o) =>
              !myVote ? (
                <PollOption
                  option={o}
                  key={o}
                  selectedVote={o === vote}
                  onVote={(option) => setVote(option)}
                />
              ) : (
                <PollResult
                  option={o}
                  key={o}
                  totalVotes={votesCount}
                  votes={votes[o]?.length}
                  myVote={myVote === o}
                />
              )
            )}
          </Flex>
        </Box>
        <Divider />
        {!myVote ? (
          <Flex
            css={{
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: '$4 $5',
              rowGap: '$5',
            }}
          >
            <Text
              size={2}
              css={{
                cursor: 'pointer',
                color: '$muted',
                order: isMobile ? 1 : 0,
              }}
              onClick={() => voteToPoll(viewPoll as string, 'skip-vote')}
            >
              Skip (show results)
            </Text>
            <Button
              disabled={!vote}
              onClick={() => voteToPoll(viewPoll as string, vote as string)}
              fullWidth={isMobile}
            >
              Confirm selection
            </Button>
          </Flex>
        ) : (
          <Flex
            css={{
              alignItems: 'center',
              justifyContent: 'flex-end',
              p: '$4 $5',
            }}
          >
            <Button fullWidth={isMobile} onClick={() => setViewPoll(null)}>
              Exit results
            </Button>
          </Flex>
        )}
      </DialogContent>
    </Dialog>
  );
};
