import { Notify } from 'notiflix';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../../api/api';
import MovieDetails from '../../Components/MovieDetails';
import MoreInfo from '../../Components/MoreInfo';
import GoBackButton from '../../Components/GoBackButton/GoBackButton';

const MovieDetailsView = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getMovieDetails(movieId)
      .then(data => !cancelled && setMovie(data))
      .catch(() => Notify.failure('Something went wrong!'));

    return () => {
      cancelled = true;
    };
  }, [movieId]);

  return (
    <>
      <GoBackButton />
      {movie && <MovieDetails movie={movie} />}
      <MoreInfo movieId={movieId} />
    </>
  );
};

export default MovieDetailsView;
