import { useDevices } from '@daily-co/daily-react';
import React, { useCallback, useMemo } from 'react';

import { styled } from '../../styles/stitches.config';
import { Flex } from '../../ui/Flex';
import { Select } from '../../ui/Select';

const StyledLabel = styled('label', {
	fontSize: '$1',
	fontWeight: 600,
});

export const Devices = () => {
	const {
		cameras,
		microphones,
		setCamera,
		setMicrophone,
		setSpeaker,
		speakers,
	} = useDevices();

	const currentCamera = useMemo(
		() => cameras.find((c) => c.selected),
		[cameras]
	);
	const currentMic = useMemo(
		() => microphones.find((m) => m.selected),
		[microphones]
	);
	const currentSpeaker = useMemo(
		() => speakers.find((s) => s.selected),
		[speakers]
	);

	const handleDeviceChange = useCallback(
		async (type: 'cam' | 'mic' | 'speaker', deviceId: string) => {
			switch (type) {
				case 'cam':
					await setCamera(deviceId);
					break;
				case 'mic':
					await setMicrophone(deviceId);
					break;
				case 'speaker':
					await setSpeaker(deviceId);
					break;
				default:
					break;
			}
		},
		[setCamera, setMicrophone, setSpeaker]
	);

	return (
		<Flex css={{ flexFlow: 'column wrap', rowGap: '$3' }}>
			<Flex css={{ flexFlow: 'column wrap', rowGap: '$1' }}>
				<StyledLabel>Camera</StyledLabel>
				<Select
					value={currentCamera?.device?.deviceId}
					onChange={(e) => handleDeviceChange('cam', e.target.value)}
				>
					{cameras.map((cam) => (
						<option value={cam.device.deviceId} key={cam.device.deviceId}>
							{cam.device.label}
						</option>
					))}
				</Select>
			</Flex>
			<Flex css={{ flexFlow: 'column wrap', rowGap: '$1' }}>
				<StyledLabel>Microphone</StyledLabel>
				<Select
					value={currentMic?.device?.deviceId}
					onChange={(e) => handleDeviceChange('mic', e.target.value)}
				>
					{microphones.map((mic) => (
						<option value={mic.device.deviceId} key={mic.device.deviceId}>
							{mic.device.label}
						</option>
					))}
				</Select>
			</Flex>
			<Flex css={{ flexFlow: 'column wrap', rowGap: '$1' }}>
				<StyledLabel>Speaker</StyledLabel>
				<Select
					value={currentSpeaker?.device?.deviceId}
					onChange={(e) => handleDeviceChange('speaker', e.target.value)}
				>
					{speakers.length > 0 ? (
						speakers.map((s) => (
							<option value={s.device.deviceId} key={s.device.deviceId}>
								{s.device.label}
							</option>
						))
					) : (
						<option value="">System default</option>
					)}
				</Select>
			</Flex>
		</Flex>
	);
};
