export namespace Filters {
    type Links = 'jobs';

    export type NamedFilter = {
        name: string;
        _links: Record<Links, { href: string }>
    }

    export type Embedded = {
        _embedded: {
            techs: Array<NamedFilter>
            contracts: Array<NamedFilter>
            availability: Array<NamedFilter>
        }
    }
}