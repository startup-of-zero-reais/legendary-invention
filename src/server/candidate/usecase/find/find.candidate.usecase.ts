import { HttpErrorException } from '@/server/@shared/exception-filter/http-error.exception';
import UseCaseInterface from '@/server/@shared/usecase/use-case.interface';
import { Candidate, CandidateRepositoryInterface } from '@/server/candidate/domain';
import CandidateMongoRepository from '@/server/candidate/infra/repository/mongo/candidate.repository';
import { FindInputDto } from './find.dto';

export default class FindCandidateUsecase implements UseCaseInterface {
	constructor(
		// @Inject(CandidateMongoRepository)
		private readonly candidateRepository: CandidateRepositoryInterface,
	) {}

	async execute(input: FindInputDto): Promise<Candidate> {
		const candidate = await this.candidateRepository.find(input.id);

		if (!candidate) {
			throw new HttpErrorException('Candidate not found', 404);
		}

		return candidate;
	}
}
