import React, { useMemo } from 'react';

import { useMeetingState } from '../../contexts/UIState';
import { Loader } from '../../ui/Loader';
import { Haircheck } from '../Haircheck';
import { LeftMeeting } from '../Left';
import { Room } from '../Room';
import { Wrapper } from '../Wrapper';

export const Layout = () => {
	const [meetingState] = useMeetingState();

	const callUI = useMemo(() => {
		switch (meetingState) {
			case 'lobby':
				return <Haircheck />;
			case 'joining-meeting':
				return <Loader />;
			case 'joined-meeting':
				return <Room />;
			case 'left-meeting':
				return <LeftMeeting />;
			default:
				return <Loader />;
		}
	}, [meetingState]);

	return <Wrapper>{callUI}</Wrapper>;
};
