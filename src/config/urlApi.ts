export const BASE_URL = "https://api.spotify.com/v1"

export const USER = "/users"
export const TRACKS = "/tracks"
export const PLAYLIST = "/playlists"

export const CURRENT_USER = BASE_URL + "/me"
export const LIST_PLAYLIST = CURRENT_USER + "/playlists"
export const SEARCH = BASE_URL + "/search"
export const NEW_RELEASES = BASE_URL + "/browse/new-releases"
export const EPISODES = BASE_URL + "/episodes"
export const TOP_TRACKS = CURRENT_USER + "/top" + TRACKS
export const TOP_ARTISTS = CURRENT_USER + "/top/artists"