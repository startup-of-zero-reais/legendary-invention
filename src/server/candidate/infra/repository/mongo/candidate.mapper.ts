import { ObjectTransformer } from '@/server/@shared/helpers';
import { Candidate, Props } from '@/server/candidate/domain';

export class CandidateMapper {
	static toDomain(mongo: Candidate): Candidate {
		const props = ObjectTransformer.transform<Candidate, Props>(mongo)
			.property('_id')
			.to('id')
			.property('name')
			.to('name')
			.property('email')
			.to('email')
			.property('image')
			.to('image')
			.property('phone')
			.to('phone')
			.property('password')
			.to('password')
			.property('professionalExperiences')
			.to('professionalExperiences')
			.property('techs')
			.to('techs')
			.transformed();

		return new Candidate(props);
	}
}
