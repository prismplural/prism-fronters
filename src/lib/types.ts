export interface Member {
    name: string,
    uuid: string,
    id: string,
    display_name?: string,
    description?: string,
    birthday?: string,
    avatar_url?: string,
    banner?: string,
    color?: string,
    pronouns?: string,
    created?: string,
    system: string
}

export interface Front {
    id: string,
    timestamp: string,
    members?: Member[]
}

export interface System {
    name?: string,
    uuid: string,
    id: string,
    description?: string,
    pronouns?: string,
    created?: string,
    tag?: string,
    color?: string,
    avatar_url?: string,
    banner?: string
}