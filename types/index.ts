export interface Trailer {
    id: string;
    key: string;
    name: string;
    type: string;
}
export interface Person {
    id: string;
    key: string;
    name: string;
    type: string;
}
export interface Video {
    name: string
    key: string
    site: string
    size: number
    type: string
    official: boolean
    published_at: string
    id: string
}
export interface Actors {
    id: string;
    key: string;
    name: string;
    type: string;
}
export interface Movie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    adult: boolean
    backdrop_path: string
    genre_ids: Number[]
    original_language: string
    original_title: string
    popularity: number
    poster_path: string
    video: boolean
    vote_average: number
    vote_count: number
}
export interface ActorInfo {
    adult: boolean
    also_known_as: string[]
    biography: string
    birthday: string
    deathday: string
    gender: number
    homepage: string
    id: number
    imdb_id: string
    known_for_department: string
    name: string
    place_of_birth: string
    popularity: number
    profile_path: string
}

export interface ActorMovies {
    cast: Movie[],
    crew: Movie[]
}