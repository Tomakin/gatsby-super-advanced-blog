import React from 'react';
import { Link } from 'gatsby';
import styles from './searchlist.module.css';

const SearchList = ({ hit }) => {
  const excerpt = hit._snippetResult.excerpt.value;

  return (
    <div className={styles.search_layout}>
      <Link className={styles.link} to={`/${hit.path}`}>
        <div className={styles.post_text}>
          <h4>{hit.title}</h4>
          <div>By: {hit.author}</div>
          <small>{hit.date}</small>
          <p> {excerpt}</p>
        </div>
      </Link>
    </div>
  );
};

export default SearchList;
