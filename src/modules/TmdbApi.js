const API_VERSION = 3;
const BASE_URL = `https://api.themoviedb.org/${API_VERSION}`;

const GLOBAL_PARAMS = {
    language: 'fr-FR',
};

const GLOBAL_HEADERS = {
    'Content-Type': 'application/json;charset=utf-8',
    'Authorization': `Bearer ${process.env.REACT_APP_TMDB_API_READ_TOKEN}`,
};

/**
 * Get discover movies
 * @param {number} genreId
 * @returns {Promise<{page: number, results: Movie[], total_pages: number, total_results: number}>}
 */
const getDiscoverMovies = async ({
    genreId = null,
} = {}) => {
    const url = `${BASE_URL}/discover/movie?${new URLSearchParams({
        ...GLOBAL_PARAMS,
        with_genres: genreId || undefined,
    })}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: GLOBAL_HEADERS,
    });
    return await response.json();
};

/**
 * Get trending movies
 * @param {string} timeWindow - day, week
 * @returns {Promise<{page: number, results: Movie[], total_pages: number, total_results: number}>}
 */
const getTrendingMovies = async ({
    timeWindow = 'week',
} = {}) => {
    const url = `${BASE_URL}/trending/movie/${timeWindow}?${new URLSearchParams(GLOBAL_PARAMS)}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: GLOBAL_HEADERS,
    });
    return await response.json();
};

/**
 * Search movies
 * @param {string} query
 * @param {boolean} includeAdult
 * @param {number} page
 * @returns {Promise<{page: number, results: Movie[], total_pages: number, total_results: number}>}
 */
const searchMovies = async ({
    query,
    includeAdult = false,
    page = 1,
}) => {
    const url = `${BASE_URL}/search/movie?${new URLSearchParams({
        ...GLOBAL_PARAMS,
        query,
        include_adult: includeAdult,
        page,
    })}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: GLOBAL_HEADERS,
    });
    return await response.json();
};

/**
 * Get movie details
 * @param {number} movieId
 * @returns {Promise<Movie>}
 */
const getMovieDetails = async ({
    movieId,
}) => {
    const url = `${BASE_URL}/movie/${movieId}?${new URLSearchParams(GLOBAL_PARAMS)}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: GLOBAL_HEADERS,
    });
    return await response.json();
};

/**
 * Get movie genres
 * @returns {Promise<{genres: {id: number, name: string}[]}>}
 */
const getGenres = async () => {
    const url = `${BASE_URL}/genre/movie/list?${new URLSearchParams(GLOBAL_PARAMS)}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: GLOBAL_HEADERS,
    });
    return await response.json();
};

/**
 * Movie:
 * {
 *  id: number,
 *  adult: boolean, # 18+
 *  genre_ids: number[],
 *  title: string,
 *  original_language: string,
 *  original_title: string,
 *  overview: string, # description
 *  media_type: string, # movie or tv
 *  poster_path: string, # movie poster url
 *  backdrop_path: string,
 *  release_date: string, # YYYY-MM-DD
 *  popularity: number,
 *  vote_count: number,
 *  vote_average: number,
 * }
 */

export default {
    getDiscoverMovies,
    getTrendingMovies,
    searchMovies,
    getMovieDetails,
    getGenres,
};
