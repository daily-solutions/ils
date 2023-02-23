import { useDevices } from '@daily-co/daily-react';
import React, { useCallback, useMemo } from 'react';

import { styled } from '../../styles/stitches.config';
import { Flex } from '../../ui/Flex';
import { Select } from '../../ui/Select';

const StyledLabel = styled('label', {
  fontSize: '$1',
  fontWeight: 600,
});

interface Props {
  audioVideo?: boolean;
}

export const Devices = ({ audioVideo = true }: Props) => {
  const {
    cameras,
    camState,
    microphones,
    micState,
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
      {audioVideo && (
        <Flex css={{ flexFlow: 'column wrap', rowGap: '$1' }}>
          <StyledLabel>Camera</StyledLabel>
          <Select
            value={currentCamera?.device?.deviceId}
            onChange={(e) => handleDeviceChange('cam', e.target.value)}
            disabled={camState !== 'granted' || cameras.length === 0}
          >
            {(camState !== 'granted' || cameras.length === 0) && (
              <option disabled value={undefined} selected>
                Turn on camera to allow access
              </option>
            )}
            {cameras.map((cam) => (
              <option value={cam.device.deviceId} key={cam.device.deviceId}>
                {cam.device.label}
              </option>
            ))}
          </Select>
        </Flex>
      )}
      {audioVideo && (
        <Flex css={{ flexFlow: 'column wrap', rowGap: '$1' }}>
          <StyledLabel>Microphone</StyledLabel>
          <Select
            value={currentMic?.device?.deviceId}
            onChange={(e) => handleDeviceChange('mic', e.target.value)}
            disabled={micState !== 'granted' || microphones.length === 0}
          >
            {(micState !== 'granted' || microphones.length === 0) && (
              <option disabled>Turn on microphone to allow access</option>
            )}
            {microphones.map((mic) => (
              <option value={mic.device.deviceId} key={mic.device.deviceId}>
                {mic.device.label}
              </option>
            ))}
          </Select>
        </Flex>
      )}
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
