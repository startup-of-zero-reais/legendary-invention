import PaginationPresenter from '@/server/@shared/repository/presenter/pagination.presenter';
import UseCaseInterface from '@/server/@shared/usecase/use-case.interface';
import { Apply } from '@/server/apply/domain/apply.entity';
import { ApplyMongoRepository } from '@/server/apply/infra/repository/mongo/apply.repository';

export class ListAppliesUseCase implements UseCaseInterface {
	constructor(private readonly repository: ApplyMongoRepository) {}

	async execute(candidateID: string): Promise<PaginationPresenter<Apply>> {
		return this.repository.findByCandidate(candidateID);
	}
}
