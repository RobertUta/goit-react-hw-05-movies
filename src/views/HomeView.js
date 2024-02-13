import React, { useContext, useEffect } from 'react';
import { QueryContext } from '../Components/App';
import Title from '../Components/Title';
import Trending from '../Components/Trending';

const HomeView = () => {
  const { setQuery } = useContext(QueryContext);

  useEffect(() => {
    setQuery('');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Title title="Trending today" />
      <Trending />
    </>
  );
};

export default HomeView;
