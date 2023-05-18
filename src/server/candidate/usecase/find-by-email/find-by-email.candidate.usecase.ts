import { HttpErrorException } from '@/server/@shared/exception-filter/http-error.exception';
import UseCaseInterface from '@/server/@shared/usecase/use-case.interface';
import Candidate from '@/server/candidate/domain/entity/candidate.entity';
import { CandidateRepositoryInterface } from '@/server/candidate/domain/repository/candidate.repository.interface';
import CandidateMongoRepository from '@/server/candidate/infra/repository/mongo/candidate.repository';
import { FindByEmailInputDto } from './find-by-email.dto';

export default class FindCandidateByEmailUsecase implements UseCaseInterface {
	constructor(
		// @Inject(CandidateMongoRepository)
		private readonly candidateRepository: CandidateRepositoryInterface,
	) {}

	async execute(input: FindByEmailInputDto): Promise<Candidate> {
		const candidate = await this.candidateRepository.findByEmail(
			input.email,
		);

		if (!candidate) {
			throw new HttpErrorException('Candidate not found', 404);
		}

		return candidate;
	}
}
