import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import UseCaseInterface from '@/server/@shared/usecase/use-case.interface';
import { RecruiterRepositoryInterface } from '@/server/recruiter/domain';
import RecruiterMongoRepository from '@/server/recruiter/infra/repository/mongo/recruiter.repository';
import { DeleteRecruiterInputDto } from './delete.recruiter.dto';

@Injectable()
export class DeleteRecruiterUseCase implements UseCaseInterface {
	constructor(
		@Inject(RecruiterMongoRepository)
		private readonly recruiterRepository: RecruiterRepositoryInterface,
	) {}

	async execute(input: DeleteRecruiterInputDto): Promise<void> {
		const recruiter = await this.recruiterRepository.find(input.id);

		if (!recruiter) {
			throw new NotFoundException('Recruiter not found');
		}

		await this.recruiterRepository.delete(recruiter.id);
	}
}
