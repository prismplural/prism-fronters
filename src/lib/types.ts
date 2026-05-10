export interface Member {
  name: string
  uuid: string
  id: string
  display_name?: string
  description?: string
  birthday?: string
  avatar_url?: string
  banner?: string
  color?: string
  pronouns?: string
  created?: string
  system: string
  webhook_avatar_url: string
  proxy_tags?: {
    prefix: string
    suffix: string
  }[]
}

export interface Front {
  id: string
  timestamp: string
  members?: Member[]
}

export interface Switch {
  id: string
  timestamp: string
  members: string[]
}

export interface System {
  name?: string
  uuid: string
  id: string
  description?: string
  pronouns?: string
  created?: string
  tag?: string
  color?: string
  avatar_url?: string
  banner?: string
}

export interface Group {
  name: string
  uuid?: string
  icon?: string
  id: string
  description?: string
  banner?: string
  color?: string
  members?: Member[]
  display_name?: string
}
