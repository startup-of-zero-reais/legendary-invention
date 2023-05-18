
import { plainToClass } from 'class-transformer';
import NotificationError from '@/server/@shared/notification/notification.error';
import { Recruiter } from '@/server/recruiter/domain';
import { CreateCompanyUseCase } from './usecase/create/create.company.usecase';
import {
	CreateCompanyInputDto,
	CreateCompanyOutputDto,
} from './usecase/create/create.dto';
import { FindCompanyUseCase } from './usecase/find/find.company.usecase';
import {
	FindCompanyInputDto,
	FindCompanyOutputDto,
} from './usecase/find/find.dto';
import { ListCompanyUseCase } from './usecase/list/list.company.usecase';
import {
	UpdateStatusCompanyInputDto,
	UpdateStatusCompanyOutputDto,
} from './usecase/update-status/update-status.company.dto';
import { UpdateStatusCompanyUseCase } from './usecase/update-status/update-status.company.usecase';
import {
	UpdateCompanyInputDto,
	UpdateCompanyOutputDto,
} from './usecase/update/update-company.dto';
import { UpdateCompanyUseCase } from './usecase/update/update.company.usecase';
import { Resp as Response } from '@/server-lib/rest/response';
import { HttpStatus } from '../infra/http/status-codes';

// @Controller('companies')
export class CompanyController {
	constructor(
		private readonly createCompanyUseCase: CreateCompanyUseCase,
		private readonly findCompanyUseCase: FindCompanyUseCase,
		private readonly listCompanyUseCase: ListCompanyUseCase,
		private readonly updateStatusCompanyUseCase: UpdateStatusCompanyUseCase,
		private readonly updateCompanyUseCase: UpdateCompanyUseCase,
	) {}

	// @Post()
	async create(
		input: CreateCompanyInputDto,
		response: Response,
	) {
		try {
			const company = await this.createCompanyUseCase.execute(input);

			return response
				.status(HttpStatus.CREATED)
				.json(plainToClass(CreateCompanyOutputDto, company));
		} catch (e: any) {
			return response
				.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.json({ error: e.message });
		}
	}

	// @Put()
	async update(
		{ companyID }: Recruiter,
		updateCompanyInputDto: UpdateCompanyInputDto,
		response: Response,
	) {
		updateCompanyInputDto.id = companyID;
		const recruiter = await this.updateCompanyUseCase.execute(
			updateCompanyInputDto,
		);
		return response
			.status(HttpStatus.CREATED)
			.json(plainToClass(UpdateCompanyOutputDto, recruiter));
	}

	// @Get('/mine')
	async fetch(
		{ companyID }: Recruiter,
		response: Response,
	) {
		try {
			const input = new FindCompanyInputDto();
			input.id = companyID;

			const company = await this.findCompanyUseCase.execute(input);

			return response
				.status(HttpStatus.OK)
				.json(plainToClass(FindCompanyOutputDto, company));
		} catch (e: any) {
			return response
				.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.json({ error: e.message });
		}
	}

	// @Get(':id')
	async getCompany(companyID: string) {
		const input = new FindCompanyInputDto();
		input.id = companyID;

		const company = await this.findCompanyUseCase.execute(input);

		return plainToClass(FindCompanyOutputDto, company, { version: 1.1 });
	}

	// @Patch()
	async updateStatus(
		{ companyID }: Recruiter,
		updateStatusCompanyInputDto: UpdateStatusCompanyInputDto,
		response: Response,
	) {
		updateStatusCompanyInputDto.id = companyID;
		const recruiter = await this.updateStatusCompanyUseCase.execute(
			updateStatusCompanyInputDto,
		);
		return response
			.status(HttpStatus.CREATED)
			.json(plainToClass(UpdateStatusCompanyOutputDto, recruiter));
	}

	// @Get()
	async list(response: Response, query) {
		try {
			const output = await this.listCompanyUseCase.execute({
				page: query.page,
				page_size: query.page_size,
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
				.json({ message: error.message });
		}
	}
}
