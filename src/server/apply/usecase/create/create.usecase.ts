import { HttpErrorException } from '@/server/@shared/exception-filter/http-error.exception';
import UseCaseInterface from '@/server/@shared/usecase/use-case.interface';
import { Apply, Status } from '@/server/apply/domain/apply.entity';
import { ApplyMongoRepository } from '@/server/apply/infra/repository/mongo/apply.repository';
import { JobFacade } from '@/server/job/facade/job.facade';
import JobFacadeInterface from '@/server/job/facade/job.facade.interface';
import { CreateApplyInputDTO } from './create.dto';
import { HttpStatus } from '@/server/infra/http/status-codes';

export class CreateApplyUseCase implements UseCaseInterface {
	constructor(
		private readonly repository: ApplyMongoRepository,

		// @Inject(JobFacade)
		private readonly jobFacade: JobFacadeInterface,
	) {}

	async execute(input: CreateApplyInputDTO): Promise<any> {
		const apply = new Apply({
			jobID: input.jobID,
			candidateID: input.candidateID,
			status: Status.FINISHED,
		});

		const [issetApply] = await Promise.all([
			this.repository.findApply(apply),
			this.jobFacade.getJobByID(input.jobID),
		]);

		if (issetApply) {
			throw new HttpErrorException(
				'You already applyied',
				HttpStatus.BAD_REQUEST,
			);
		}

		await this.repository.apply(apply);
	}
}
