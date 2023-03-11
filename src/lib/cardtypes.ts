export default interface DiscordCardSettings {
    dprofileVersion: number,
    theme: Theme,
    colors: {
        primary?: string,
        secondary?: string,
        banner?: string,
    },
    banner: string,
    avatar: string,
    info: {
        username: string,
        nickname: string,
        discriminator: string,
        status: string,
        emoji: string,
        emoji_url: string,
        about: string,
        notes: string,
    }
    roles: {
        color?: string,
        name: string
        full?: boolean
    }[],
    joindate: {
        global: {
            icon?: string,
            emoji?: string,
            date: string
        },
        server: {
            icon?: string,
            emoji?: string,
            date: string
        },
    }
}

export enum Theme {
    light = 'Light', dark = 'Dark'
}

export const defaultCard: DiscordCardSettings = {
    dprofileVersion: 1,
    theme: Theme.dark,
    colors: {},
    banner: "",
    avatar: "",
    joindate: {
        global: {
            date: ""
        },
        server: {
            date: ""
        }
    },
    info: {
        username: "Username",
        nickname: "Nickname",
        discriminator: "0001",
        status: "status message...",
        emoji: "✨",
        emoji_url: "",
        about: "",
        notes: ""
    },
    roles: []
}