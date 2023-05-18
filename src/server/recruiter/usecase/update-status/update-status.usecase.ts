import { HttpStatus, Inject } from '@nestjs/common';
import { HttpErrorException } from '@/server/@shared/exception-filter/http-error.exception';
import UseCaseInterface from '@/server/@shared/usecase/use-case.interface';
import { Recruiter, RecruiterRepositoryInterface } from '@/server/recruiter/domain';
import RecruiterMongoRepository from '@/server/recruiter/infra/repository/mongo/recruiter.repository';
import { UpdateStatusRecruiterInputDto } from './update-status.dto';

export class UpdateStatusRecruiterUseCase implements UseCaseInterface {
	constructor(
		@Inject(RecruiterMongoRepository)
		private readonly recruiterRepository: RecruiterRepositoryInterface,
	) {}

	async execute(input: UpdateStatusRecruiterInputDto): Promise<Recruiter> {
		const recruiter = await this.recruiterRepository.find(input.id);
		if (!recruiter)
			throw new HttpErrorException(
				'Recruiter not found',
				HttpStatus.NOT_FOUND,
			);
		recruiter.changeStatus(input.status);

		await this.recruiterRepository.update(recruiter);

		return recruiter;
	}
}
