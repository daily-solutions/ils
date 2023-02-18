import { DailyVideo, useParticipantProperty } from '@daily-co/daily-react';
import React, {
	memo,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

import { useActiveSpeakerId } from '../../hooks/useActiveSpeakerId';
import { Box } from '../../ui/Box';
import { TileInfo } from './TileInfo';

interface Props {
	sessionId: string;
	isScreen?: boolean;
	aspectRatio?: number;
	showBorder?: boolean;
	isMobile?: boolean;
}

export const Tile = memo(
	({
		aspectRatio = 16 / 9,
		isMobile = false,
		isScreen = false,
		sessionId,
		showBorder = false,
	}: Props) => {
		const tileRef = useRef<HTMLDivElement>(null);
		const videoRef = useRef<HTMLVideoElement>(null);
		const [tileAspectRatio, setTileAspectRatio] = useState(aspectRatio);

		const activeSpeakerId = useActiveSpeakerId({ ignoreLocal: true });
		const isSpeaking = useMemo(
			() => activeSpeakerId === sessionId && showBorder,
			[activeSpeakerId, sessionId, showBorder]
		);

		const [video, userName, isLocal] = useParticipantProperty(sessionId, [
			'video',
			'user_name',
			'local',
		]);

		const handleVideoResize = useCallback(
			({ aspectRatio }: { aspectRatio: number }) => {
				if (isScreen) setTileAspectRatio(aspectRatio);
			},
			[isScreen]
		);

		useEffect(() => {
			if (aspectRatio === tileAspectRatio) return;
			setTileAspectRatio(aspectRatio);
		}, [aspectRatio, tileAspectRatio]);

		return (
			<Box
				ref={tileRef}
				css={{
					position: 'relative',
					width: '100%',
					overflow: 'hidden',
					minWidth: '1px',
					maxWidth: 'calc(100% / var(--grid-columns, 1) - var(--grid-gap))',
				}}
			>
				<Box
					css={{
						pb: `${100 / aspectRatio}%`,
						background: '$disabled',
					}}
				>
					{video ? (
						<>
							<DailyVideo
								ref={videoRef}
								fit="cover"
								automirror
								sessionId={sessionId}
								type={isScreen ? 'screenVideo' : 'video'}
								onResize={handleVideoResize}
								playableStyle={{
									height: 'calc(100% + 4px)',
									left: '-2px',
									width: 'calc(100% + 4px)',
									position: 'absolute',
									top: '-2px',
									objectPosition: 'center',
								}}
							/>
							<TileInfo
								isMobile={isMobile}
								sessionId={sessionId}
								isSpeaking={isSpeaking}
							/>
						</>
					) : (
						<Box
							css={{
								position: 'absolute',
								top: '50%',
								left: '50%',
								transform: 'translate(-50%, -50%)',
							}}
						>
							{userName} {isLocal && '(You)'}
						</Box>
					)}
					{isSpeaking && (
						<Box
							css={{
								position: 'absolute',
								height: '100%',
								width: '100%',
								left: 0,
								top: 0,
								border: '3px solid $yellow',
							}}
						/>
					)}
				</Box>
			</Box>
		);
	}
);

Tile.displayName = 'Tile';
