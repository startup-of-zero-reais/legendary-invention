import Repository from '@/server/@shared/repository/repository-interface';
import Company from '../entity/company.entity';

export type CompanyRepositoryInterface = Repository<Company> & {
	findByCnpj(cnpj: string): Promise<Company>;
};
