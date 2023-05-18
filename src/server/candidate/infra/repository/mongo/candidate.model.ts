import mongoose, { Schema } from 'mongoose';
import { professionalExperienceSchema } from './professional-experience.model';
import { techsSchema } from './techs.model';
import { Candidate as CandidateDomain } from '@/server/candidate/domain';

export const candidateSchema = new Schema<CandidateDomain>({
	_id: { type: mongoose.Types.ObjectId },
	name: { type: String },
	email: { type: String },
	image: { type: String },
	phone: { type: String },
	password: { type: String },
	techs: {
		default: undefined,
		type: [techsSchema],
		ref: 'Techs'
	},
	professionalExperiences: {
		default: undefined,
		type: [professionalExperienceSchema],
		ref: 'ProfessionalExperiences'
	},
}, {
	timestamps: {
		createdAt: 'createdAt',
		updatedAt: 'updatedAt'
	}
})

export const Candidate = mongoose.models.Candidate<CandidateDomain>
	|| mongoose.model<CandidateDomain>('Candidate', candidateSchema);
