import mongoose from 'mongoose';
import { Status } from '@/server/apply/domain/apply.entity';
import { Candidate } from '@/server/candidate/infra/repository/mongo/candidate.model';
import { JobAdView } from '@/server/job/infra/repository/mongo/job-ad.model';

export class Apply {
	// @Prop({ type: mongoose.Types.ObjectId })
	_id?: string;

	// @Prop({ ref: JobAdView.name })
	job: JobAdView;

	// @Prop({ ref: Candidate.name })
	candidate: Candidate;

	// @Prop({ enum: Status, default: Status.INTENT })
	status: Status;

	createdAt?: Date;
	updatedAt?: Date;
}

export const ApplySchema = SchemaFactory.createForClass(Apply);
