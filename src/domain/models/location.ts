type Links = 'jobs'

export type Location = {
    name: string;
    _links: Array<Record<Links, string>>
}

export type EmbeddedLocations = {
    _embedded: Array<Location>;
}