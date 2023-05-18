import { plainToClass } from 'class-transformer';
import { Candidate } from '@/server/candidate/domain';
import { CreateApplyInputDTO } from './usecase/create/create.dto';
import { CreateApplyUseCase } from './usecase/create/create.usecase';
import { ListAppliesOutputDTO } from './usecase/list/list.dto';
import { ListAppliesUseCase } from './usecase/list/list.usecase';

// @Controller('apply')
export class ApplyController {
	constructor(
		private readonly createApplyUseCase: CreateApplyUseCase,
		private readonly listApplyUseCase: ListAppliesUseCase,
	) {}

	// @Post()
	async apply(
		candidate: Candidate,
		input: CreateApplyInputDTO,
	) {
		input.candidateID = candidate.id;
		return this.createApplyUseCase.execute(input);
	}

	// @Get()
	async list(candidate: Candidate) {
		return plainToClass(
			ListAppliesOutputDTO,
			await this.listApplyUseCase.execute(candidate.id),
		);
	}
}
