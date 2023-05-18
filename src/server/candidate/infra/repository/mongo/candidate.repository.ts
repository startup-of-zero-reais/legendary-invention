import { PaginationInterface } from '@/server/@shared/repository/pagination-interface';
import { Candidate as Entity, CandidateRepositoryInterface } from '@/server/candidate/domain';
import PaginationPresenter from '../presenter/pagination.presenter';
import { Candidate } from './candidate.model';
import { ProfessionalExperienceMapper } from './professional-experience.mapper';
import { TechsMapper } from './techs.mapper';
import { BadRequestException } from '@/server/infra/exceptions/bad-request.exception';

export default class CandidateMongoRepository
	implements CandidateRepositoryInterface
{
	static make() {
		return new CandidateMongoRepository()
	}

	delete(id: string): Promise<void> {
		throw new Error('Method not implemented.');
	}

	async paginate(
		per_page = 10,
		page = 1,
	): Promise<PaginationInterface<Entity>> {
		const [countCandidates, candidates] = await Promise.all([
			await Candidate.find().countDocuments().exec(),
			await Candidate
				.find()
				.sort({ createdAt: -1 })
				.limit(per_page)
				.skip((page - 1) * per_page)
				.exec(),
		]);

		return new PaginationPresenter(
			candidates.map((candidate) => this.toDomain(candidate)),
			per_page,
			page,
			countCandidates,
		);
	}

	async create(entity: Entity): Promise<void> {
		await Candidate.create({
			_id: entity.id,
			name: entity.name,
			email: entity.email,
			image: entity.image,
			password: entity.password,
			phone: entity.phone,
			techs: TechsMapper.ToObject(entity.techs),
			professionalExperiences: ProfessionalExperienceMapper.ToObject(
				entity.professionalExperiences,
			),
			createdAt: entity.createdAt,
			updatedAt: entity.updatedAt,
		});
	}

	async update(entity: Entity): Promise<void> {
		await Candidate
			.findByIdAndUpdate(entity.id, {
				name: entity.name,
				image: entity.image,
				phone: entity.phone,
				techs: TechsMapper.ToObject(entity.techs),
			})
			.populate('techs');
	}

	async findByEmail(email: string): Promise<Entity> {
		const candidate = await Candidate.findOne({ email }).exec();
		return this.toDomain(candidate);
	}

	async find(id: string): Promise<Entity> {
		const candidate = await Candidate.findOne({ _id: id }).exec();
		return this.toDomain(candidate);
	}

	private toDomain(object?: any): Entity {
		if (!object) throw new BadRequestException(`Candidate not found`);

		return new Entity({
			id: object._id,
			name: object.name,
			email: object.email,
			password: object.password,
			image: object.image,
			phone: object.phone,
			techs: TechsMapper.ToDomain(object.techs),
			professionalExperiences: ProfessionalExperienceMapper.ToDomain(
				object.professionalExperiences,
			),
			createdAt: object.createdAt,
			updatedAt: object.updatedAt,
		});
	}
}
