export interface Account {
    country: string
    display_name: string
    explicit_content: ExplicitContent
    external_urls: ExternalUrls
    followers: Followers
    href: string
    id: string
    images: any[]
    product: string
    type: string
    uri: string
}

export interface ExplicitContent {
    filter_enabled: boolean
    filter_locked: boolean
}

export interface ExternalUrls {
    spotify: string
}

export interface Followers {
    href: any
    total: number
}
