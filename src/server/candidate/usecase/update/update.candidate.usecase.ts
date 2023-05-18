import {
	Candidate,
	Tech as Techs,
	CandidateRepositoryInterface,
	ProfessionalExperience,
} from '@/server/candidate/domain';
import CandidateMongoRepository from '@/server/candidate/infra/repository/mongo/candidate.repository';
import { UpdateCandidateInputDto } from './update.candidate.dto';
import { BadRequestException } from '@/server/infra/exceptions/bad-request.exception';

export default class UpdateCandidateUseCase {
	static make() {
		return new UpdateCandidateUseCase(
			CandidateMongoRepository
		)
	}
	
	constructor(
		private readonly candidateRepository: CandidateRepositoryInterface,
	) {}

	async execute(input: UpdateCandidateInputDto): Promise<Candidate> {
		const candidate = await this.candidateRepository.find(input.id);

		if (!candidate) {
			throw new BadRequestException('Candidate not found');
		}

		const { name, image, phone, techs, professionalExperiences } = input;

		candidate.update({
			name,
			image,
			phone,
			techs: techs?.map((tech) => {
				return new Techs({
					knowledge_level: tech.knowledge_level,
					tech: tech.tech,
				});
			}),
			professionalExperiences: professionalExperiences?.map(
				(experience) =>
					new ProfessionalExperience({
						acting_time: experience.acting_time,
						company: experience.company,
						description: experience.description,
						qualification: experience.qualification,
						role: experience.role,
					}),
			),
		});

		await this.candidateRepository.update(candidate);

		return candidate;
	}
}
