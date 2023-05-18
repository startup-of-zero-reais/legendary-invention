import { plainToClass } from 'class-transformer';
import NotificationError from '@/server/@shared/notification/notification.error';
import { HttpStatus } from '@/server/infra/http/status-codes';
import { Resp as Response } from '@/server-lib/rest/response';
import CreateCandidateUseCase from './usecase/create/create.candidate.usecase';
import { CreateCandidateInputDto, CreateCandidateOutputDto } from './usecase/create/create.dto';
import ListCandidateUseCase from './usecase/list/list.candidate.usecase';
import { UpdateCandidateInputDto, UpdateCandidateOutputDto } from './usecase/update/update.candidate.dto';
import UpdateCandidateUseCase from './usecase/update/update.candidate.usecase';
import FindCandidateUsecase from './usecase/find/find.candidate.usecase';
import { FindOutputDto } from './usecase/find/find.dto';
import { Candidate } from './domain';

export class CandidateController {
	static make() {
		return new CandidateController(
			null!, 
			ListCandidateUseCase.make(),
			null!
		)
	}

	constructor(
		private readonly createCandidateUseCase: CreateCandidateUseCase,
		private readonly listCandidateUseCase: ListCandidateUseCase,
		private readonly updateCandidateUseCase: UpdateCandidateUseCase,
	) {}

	async list(request: Request, response: Response) {
		const reqOpt = new URL(request.url)
		const { searchParams: query } = reqOpt

		let page: number = 1,
			page_size: number = 15;

		if (!isNaN(+query.get('page')!)) page = +query.get('page')!
		if (!isNaN(+query.get('page_size')!)) page_size = +query.get('page_size')!

		try {
			const output = await this.listCandidateUseCase.execute({
				page,
				page_size,
			});

			return response.status(HttpStatus.OK).json(output);
		} catch (error: any) {
			if (error instanceof NotificationError) {
				return response
					.status(HttpStatus.UNPROCESSABLE_ENTITY)
					.json(error);
			}
			return response
				.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.json({ error: error.message });
		}
	}

	async create(
		request: Request,
		response: Response,
	) {
		const createCandidateDto = await request.json()

		const output = await this.createCandidateUseCase.execute(
			createCandidateDto,
		);

		return response
			.status(HttpStatus.CREATED)
			.json(plainToClass(CreateCandidateOutputDto, output));
	}

	async update(
		updateCandidateDto: UpdateCandidateInputDto,
		candidate: Candidate,
		response: Response,
	) {
		try {
			updateCandidateDto.id = candidate.id;
			const output = await this.updateCandidateUseCase.execute(
				updateCandidateDto,
			);

			return response
				.status(HttpStatus.OK)
				.json(plainToClass(UpdateCandidateOutputDto, output));
		} catch (error) {
			if (error instanceof NotificationError) {
				return response
					.status(HttpStatus.UNPROCESSABLE_ENTITY)
					.json(error);
			}
			return response
				.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.json(error);
		}
	}
}
