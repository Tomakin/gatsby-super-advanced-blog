import React from 'react';
import Layout from '../components/Layout';
import { graphql } from 'gatsby';
import PostList from '../components/PostList';
import styles from './styles/blog.module.css';

const Blog = ({ data }) => {
  const edges = data.allMarkdownRemark.edges;

  return (
    <Layout title='Blog' description='All the posts'>
      <div className={styles.blog_layout}>
        {edges
          ? edges.map(edge => (
              <PostList
                key={edge.node.id}
                excerpt={edge.node.excerpt}
                post={edge.node.frontmatter}
              />
            ))
          : null}
      </div>
    </Layout>
  );
};

export default Blog;

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 300)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            path
            title
            author
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 1200) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
