import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCastInfo } from '../../api/api';
import Cast from '../../Components/MoreInfo/Cast/Cast';
import NotFound from '../../Components/MoreInfo/NotFound';

const CastView = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    let cancelled = false;
    getCastInfo(movieId).then(data => !cancelled && setCast(data));

    return () => {
      cancelled = true;
    };
  }, [movieId]);

  return <>{cast.length > 0 ? <Cast cast={cast} /> : <NotFound />}</>;
};

export default CastView;
