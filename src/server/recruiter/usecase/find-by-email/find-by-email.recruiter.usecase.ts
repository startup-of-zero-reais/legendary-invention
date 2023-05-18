import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import UseCaseInterface from '@/server/@shared/usecase/use-case.interface';
import { Recruiter, RecruiterRepositoryInterface } from '@/server/recruiter/domain';
import RecruiterMongoRepository from '@/server/recruiter/infra/repository/mongo/recruiter.repository';
import { FindByEmailInputDto } from './find-by-email.dto';

@Injectable()
export class FindByEmailRecruiterUseCase implements UseCaseInterface {
	constructor(
		@Inject(RecruiterMongoRepository)
		private readonly recruiterRepository: RecruiterRepositoryInterface,
	) {}

	async execute(input: FindByEmailInputDto): Promise<Recruiter> {
		const recruiter = await this.recruiterRepository.findByEmail(
			input.email,
		);

		if (!recruiter) {
			throw new NotFoundException('Recruiter not found');
		}

		return recruiter;
	}
}
