import { Notify } from 'notiflix';
import React, { useContext, useEffect, useState } from 'react';
import { getMoviesByQuery } from '../api/api';
import SearchForm from '../Components/SearchForm';
import MoviesList from '../Components/MoviesList/MoviesList';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs';
import { QueryContext } from '../Components/App';

const MoviesView = () => {
  const [movies, setMovies] = useState([]); // state to store fetched movies

  const { query, setQuery } = useContext(QueryContext); // get query state and setQuery function from context
  const { search, pathname } = useLocation(); // hook to get current url
  const navigate = useNavigate(); // hook to navigate to another route

  useEffect(() => {
    if (search.includes('query')) {
      setQuery(qs.parse(search.replace('?', '')).query);
      return;
    }
    setQuery('');
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // eslint-disable-line react-hooks/exhaustive-deps
    let cancelled = false; // flag to check if component is unmounted

    !query && setMovies([]); // clear movies list if query is empty

    if (query) {
      navigate(`${pathname}?query=${query}`); // update url with query
      getMoviesByQuery(query) // fetch movies by query
        .then(data => !cancelled && setMovies(data)) // update state with fetched data
        .catch(() => Notify.failure('Something went wrong!')); // show error notification
    }
    return () => {
      // cleanup function
      cancelled = true; // set flag to true to prevent updating state after component is unmounted
    };
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = query => setQuery(query); // update query state with input value

  return (
    // render search form and movies list
    <>
      <SearchForm onSubmit={onSubmit} />
      <MoviesList movies={movies} />
    </>
  );
};

export default MoviesView;
