import { createApi, fetchBaseQuery  } from '@reduxjs/toolkit/query/react';
import * as T from "../../types";

const TMDB_API_KEY: string = process.env.TMDB_API_KEY;
const BASE_URL = process.env.BASE_URL;
const ACCESS_AUTH_TOKEN = process.env.ACCESS_AUTH_TOKEN;
const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${ACCESS_AUTH_TOKEN}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getPopularMovies: builder.query<T.Movie[], string>({
            query: (time_window = 'week') => `/trending/movie/${time_window}?api_key=${TMDB_API_KEY}&date=${getCurrentDate()}`,
        }),
        getPopularPerson: builder.query<T.Person[], string>({
            query: (day: 'day') => `/trending/person/${day}?api_key=${TMDB_API_KEY}&date=${getCurrentDate()}`,
        }),
        getUpcomingMovies: builder.query<T.Movie[], number>({
            query: (page = 1) => `/discover/movie?page=${page}&api_key=${TMDB_API_KEY}&primary_release_date.gte=${getCurrentDate()}`,
        }),

        getMovies: builder.query<T.Movie[], number>({
            query: (page = 1) => `/discover/movie?page=${page}&api_key=${TMDB_API_KEY}`,
        }),
        getMovieById: builder.query<T.Movie, number>({
            query: (id) => `/movie/${id}/credits?api_key=${TMDB_API_KEY}`,
        }),
        getActorsForMovie: builder.query<T.Actors[], number>({
            query: (id) => `/movie/${id}?api_key=${TMDB_API_KEY}`,
        }),
        searchMovies: builder.query<T.Movie[], string>({
            query: (query) => `/search/movie?query=${query}&api_key=${TMDB_API_KEY}`,
        }),
        getMoviesByCategory: builder.query<T.Movie[], string>({
            query: (category) => `/discover/movie?with_genres=${category}&api_key=${TMDB_API_KEY}`,
        }),
        getSimilarMoviesById: builder.query<T.Movie[], number>({
            query: (id) => `/movie/${id}/similar?api_key=${TMDB_API_KEY}`
        }),
        getMovieRecommendations: builder.query<T.Movie[], number>({
            query: (id) => `/movie/${id}/recommendations?api_key=${TMDB_API_KEY}`
        }),
        getMovieTrailer: builder.query<T.Video[], number>({
            query: (id) => `/movie/${id}/videos?api_key=${TMDB_API_KEY}`,
        }),
        getActorInfo: builder.query<T.ActorInfo, number>({
            query: (id) => `/person/${id}?api_key=${TMDB_API_KEY}`,
        }),
        getActorMovies: builder.query<T.ActorMovies, number>({
            query: (id) => `/person/${id}/movie_credits?api_key=${TMDB_API_KEY}`,
        })

    }),
});

export const {
    useGetPopularMoviesQuery,
    useGetUpcomingMoviesQuery,
    useGetPopularPersonQuery,
    useGetActorsForMovieQuery,
    useGetMoviesQuery,
    useGetMovieByIdQuery,
    useSearchMoviesQuery,
    useGetMoviesByCategoryQuery,
    useGetSimilarMoviesByIdQuery,
    useGetMovieRecommendationsQuery,
    useGetMovieTrailerQuery,
    useGetActorInfoQuery,
    useGetActorMoviesQuery,
} = api;
