import JobAd, { Status } from '../entity/job.entity';
import { Event } from './event';

export type Props = {
	id: string;
	editor: string;
};

export class JobAdActivatedEvent extends Event {
	static action = 'jobad.activated';

	constructor(props: Props) {
		super(
			JobAdActivatedEvent.action,
			new JobAd({
				id: props.id,
				status: Status.ACTIVATED,
				editors: [props.editor],
			}),
		);
	}
}
