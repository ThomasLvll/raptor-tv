import React from 'react';
import TmdbApi from "../modules/TmdbApi";
import MoviePreview from '../components/MoviePreview';
import { SimpleGrid, HStack, Box } from "@chakra-ui/react"
import MovieSearchBar from '../components/MovieSearchBar';

const featuredGenres = [
  'horreur',
  'animation',
  'science-fiction',
  'thriller',
];

function MovieList() {
  const [genreList, setGenreList] = React.useState([]);
  const [movieLists, setMovieLists] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    TmdbApi.getGenres().then((data) => {
      setGenreList(data.genres);
    });
  }, []);

  const filterMovieLists = (movieLists) =>
    movieLists
      .filter((value, index, self) => self.findIndex((movieList) => movieList.id === value.id) === index)
      .filter((movieList) => movieList.movies.length > 0)
      .sort((a, b) => a.order - b.order);

  React.useEffect(() => {
    setMovieLists([]);
    TmdbApi.getTrendingMovies({ timeWindow: 'week', }).then((data) => {
      setMovieLists((movieLists) => [
        ...movieLists,
        {
          order: 0,
          id: 'trending',
          title: 'Dernières tendances',
          movies: data.results,
        }
      ]);
    });
    genreList
      .filter((genre) => featuredGenres.includes(genre.name.toLowerCase()))
      .forEach((genre, index) => {
        TmdbApi.getDiscoverMovies({ genreId: genre.id, }).then((data) => {
          setMovieLists((movieLists) => [
            ...movieLists,
            {
              order: featuredGenres.indexOf(genre.name.toLowerCase()) + 1,
              id: `genre-${genre.id}`,
              title: genre.name,
              movies: data.results,
            }
          ]);
        });
      });
  }, [genreList]);

  React.useEffect(() => {
    if (searchTerm.length > 0) {
      TmdbApi.searchMovies({ query: searchTerm, }).then((data) => {
        setSearchResults(data.results);
      });
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <>
      <MovieSearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {
        (
          searchTerm.length > 0
          ? [{
            order: -1,
            id: 'search',
            title: `${searchResults.length} résultat${searchResults.length > 1 ? 's' : ''} pour « ${searchTerm} »`,
            movies: searchResults,
          }]
          : filterMovieLists(movieLists)
        )
        .map((movieList) => (
        <Box key={movieList.id} margin="30px">
          <h2>{movieList.title}</h2>
          <Box width="100%" overflowX="auto" css={{
            '&::-webkit-scrollbar': {
              display: 'none'
            },
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none',
          }}>
            <HStack spacing={4} shouldWrapChildren>
              {(movieList.movies).slice(0, 20).map((movie) =>
                <Box width="200px" key={movie.id}>
                  <MoviePreview movie={movie} />
                </Box>
              )}
            </HStack>
          </Box>
        </Box>
      ))}
    </>
  );
}

export default MovieList;
