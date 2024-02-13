import React, { createContext, useState } from 'react';
import Header from './Header';
import Main from './Main';

export const QueryContext = createContext();

const App = () => {
  const [query, setQuery] = useState('');
  const { Provider: QueryProvider } = QueryContext;

  return (
    <QueryProvider value={{ query, setQuery }}>
      <Header />
      <Main />
    </QueryProvider>
  );
};

export default App;
