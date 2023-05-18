import { Status } from '@/server/job/domain/entity/job.entity';

export class UpdateJobStatusInputDto {
	id: string;
	editor: string;
	status: Status;
}
