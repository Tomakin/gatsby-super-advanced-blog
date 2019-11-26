import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, connectHits } from 'react-instantsearch-dom';
import SearchList from '../SearchList';
import { connectSearchBox } from 'react-instantsearch/connectors';
import styles from './search.module.css';

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
);

const Results = connectSearchBox(({ currentRefinement }) =>
  currentRefinement ? <Hits /> : null
);

const Hits = connectHits(({ hits }) => (
  <div className={styles.search_container}>
    {hits && hits.map(hit => <SearchList key={hit.id} hit={hit} />)}
  </div>
));

const SearchBox = ({ currentRefinement, refine }) => (
  <form noValidate action='' role='search'>
    <input
      type='search'
      placeholder='Search...'
      value={currentRefinement}
      onChange={event => refine(event.currentTarget.value)}
    />
  </form>
);

const CustomSearchBox = connectSearchBox(SearchBox);

const Search = () => {
  return (
    <InstantSearch
      indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
      searchClient={searchClient}
    >
      <CustomSearchBox />
      <Results />
    </InstantSearch>
  );
};

export default Search;
