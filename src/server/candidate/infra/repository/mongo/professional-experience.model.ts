import mongoose, { Schema } from 'mongoose';
import { Props } from '@/server/candidate/domain'

export const professionalExperienceSchema = new Schema({
	company: String,
	role: String,
	acting_time: String,
	description: String,
	qualification: String,
})

export const ProfessionalExperience = mongoose.models.ProfessionalExperiences<Props>
	|| mongoose.model<Props>('ProfessionalExperiences', professionalExperienceSchema)
