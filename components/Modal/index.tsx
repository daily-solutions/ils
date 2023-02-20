import { CreatePoll } from './CreatePoll';
import { InviteToJoin } from './InviteToJoin';
import { ViewPoll } from './ViewPoll';

export const Modals = () => {
	return (
		<>
			<CreatePoll />
			<ViewPoll />
			<InviteToJoin />
		</>
	);
};
