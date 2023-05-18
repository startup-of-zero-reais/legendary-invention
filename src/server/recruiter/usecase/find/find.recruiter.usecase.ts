import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import UseCaseInterface from '@/server/@shared/usecase/use-case.interface';
import { Recruiter, RecruiterRepositoryInterface } from '@/server/recruiter/domain';
import RecruiterMongoRepository from '@/server/recruiter/infra/repository/mongo/recruiter.repository';
import { FindRecruiterInputDto } from './find.recruiter.dto';

@Injectable()
export class FindRecruiterUseCase implements UseCaseInterface {
	constructor(
		@Inject(RecruiterMongoRepository)
		private readonly recruiterRepository: RecruiterRepositoryInterface,
	) {}

	async execute(input: FindRecruiterInputDto): Promise<Recruiter> {
		const recruiter = await this.recruiterRepository.find(input.id);

		if (!recruiter) {
			throw new NotFoundException('Recruiter not found');
		}

		return recruiter;
	}
}
