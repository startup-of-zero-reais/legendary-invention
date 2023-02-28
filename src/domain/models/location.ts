type Links = 'jobs'

export type Location = {
    name: string;
    _links: Record<Links, string>
}

export type EmbeddedLocations = {
    _embedded: Array<Location>;
}