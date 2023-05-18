export class ListCandidateInputDto {
	page: number = 1;
	page_size: number = 10;
}

export class ListCandidateOutputDto {
	data = [];
	meta: Meta;
}

type Meta = {
	total: number;
	currentPage: number;
	firstPage: number;
	lastPage: number;
	perPage: number;
};
