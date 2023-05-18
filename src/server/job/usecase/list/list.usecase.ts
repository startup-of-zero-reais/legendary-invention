import { Inject, Injectable } from '@nestjs/common';
import PaginationPresenter from '@/server/@shared/repository/presenter/pagination.presenter';
import UseCaseInterface from '@/server/@shared/usecase/use-case.interface';
import JobAd, { Status } from '@/server/job/domain/entity/job.entity';
import { JobAdMongoRepository } from '@/server/job/infra/repository/mongo/job-ad.repository';
import { ListJobsInputDTO } from './list.dto';

@Injectable()
export class ListJobsUseCase implements UseCaseInterface {
	constructor(
		@Inject(JobAdMongoRepository)
		private readonly repository: JobAdMongoRepository,
	) {}

	async execute(
		input: ListJobsInputDTO,
	): Promise<PaginationPresenter<JobAd>> {
		const { page, per_page, search, ...filters } = input;

		filters.status = [Status.ACTIVATED];

		return this.repository.paginate(page, per_page, search, filters);
	}
}
