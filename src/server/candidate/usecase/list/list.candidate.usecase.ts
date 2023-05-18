import { CandidateRepositoryInterface } from '@/server/candidate/domain/repository/candidate.repository.interface';
import CandidateMongoRepository from '@/server/candidate/infra/repository/mongo/candidate.repository';
import { ListCandidateInputDto, ListCandidateOutputDto } from './list.dto';

export default class ListCandidateUseCase {
	static make() {
		return new ListCandidateUseCase(
			CandidateMongoRepository.make(),
		)
	}

	constructor(
		private readonly candidateRepository: CandidateRepositoryInterface,
	) {}

	async execute(input: ListCandidateInputDto): Promise<ListCandidateOutputDto> {
		const candidates = await this.candidateRepository.paginate(
			input.page_size,
			input.page,
		);

		return {
			data: candidates.items().map((candidate) => ({
				id: candidate.id,
				name: candidate.name,
				email: candidate.email,
				phone: candidate.phone,
				image: candidate.image,
				techs: candidate.techs.map((tech) => ({
					knowledge_level: tech.knowledge_level,
					tech: tech.tech,
				})),
				professionalExperiences: candidate.professionalExperiences.map(
					(experience) => ({
						company: experience.company,
						role: experience.role,
						acting_time: experience.acting_time,
						description: experience.description,
						qualification: experience.qualification,
					}),
				),
				updatedAt: candidate.updatedAt,
				createdAt: candidate.createdAt,
			})),
			meta: {
				total: candidates.total(),
				currentPage: candidates.currentPage(),
				firstPage: candidates.firstPage(),
				lastPage: candidates.lastPage(),
				perPage: candidates.perPage(),
			},
		};
	}
}
