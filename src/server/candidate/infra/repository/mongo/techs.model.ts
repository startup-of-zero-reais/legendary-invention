import mongoose, { Schema } from 'mongoose';
import { KnowledgeLevel } from '@/server/candidate/domain';

export const techsSchema = new Schema({
	tech: String,
	knowledge_level: {
		enum: [
			KnowledgeLevel.BEGINNER,
			KnowledgeLevel.INTERMEDIATE,
			KnowledgeLevel.ADVANCED,
		],
	}
})

export const Tech = mongoose.models.Techs || mongoose.model('Techs', techsSchema)
