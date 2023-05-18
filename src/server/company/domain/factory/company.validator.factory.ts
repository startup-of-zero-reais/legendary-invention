import ValidatorInterface from '@/server/@shared/validator/ValidatorInterface';
import Company from '../entity/company.entity';
import { CompanyYupValidator } from '../validator/company.yup.validator';

export class CompanyValidatorFactory {
	static create(): ValidatorInterface<Company> {
		return new CompanyYupValidator();
	}
}
