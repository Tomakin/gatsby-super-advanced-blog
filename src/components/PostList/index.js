import React from 'react';
import { Link } from 'gatsby';
import styles from './postlist.module.css';
import Img from 'gatsby-image';

const PostList = ({ post, excerpt }) => {
  let featuredImg = post.featuredImage.childImageSharp.fluid;

  return (
    <div className={styles.post_layout}>
      <Link className={styles.link} to={`${post.path}`}>
        <Img fluid={featuredImg} />
        <div className={styles.post_text}>
          <h4>{post.title}</h4>
          <div>By: {post.author}</div>
          <small>{post.date}</small>
          <p> {excerpt}</p>
        </div>
      </Link>
    </div>
  );
};

export default PostList;
