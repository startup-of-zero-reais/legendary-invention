export namespace LoadAppliedJobs {
    type Links = 'job' | 'company';

    export type Result = {
        data: Model[];
        meta: { total: number; }
    }

    export type Model = {
        job: JobModel;
        createdAt: Date;
        _links: Record<Links, { href: string }>;
    }

    export type JobModel = {
        id: string;
        title: string;
        description: string;
        status: string;
        company: CompanyModel;
        contracts: string[];
        techs: string[];
        availability: string;
        location: string;
    }

    export type CompanyModel = {
        id: string;
        logo: string;
        cnpj: string;
        description: string;
    }
}