import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import TagsList from '../components/TagsList';
import styles from './styles/blogTemplate.module.css';
import SEO from '../components/SEO';
import { Disqus } from 'gatsby-plugin-disqus';

const BlogTemplate = ({ data }) => {
  const { siteMetadata } = data.site;
  const { siteUrl } = siteMetadata;
  const { frontmatter, html, excerpt, id } = data.markdownRemark;
  const { title, date, author, tags, path } = frontmatter;
  const image = frontmatter.featuredImage.childImageSharp.fluid;

  const seoData = {
    title,
    description: excerpt,
    image,
    article: true,
    pathname: path
  };

  const disqusConfig = {
    url: `${siteUrl + path}`,
    identifier: id,
    title: title
  };

  return (
    <>
      <SEO seoData={seoData} />
      <Layout>
        <div className={styles.blog_layout}>
          <h1>{title}</h1>
          <h2>
            {date} by: {author}
          </h2>
          <div dangerouslySetInnerHTML={{ __html: html }} />
          <TagsList tags={tags} />
          <br />
          <br />
          <Disqus config={disqusConfig} />
        </div>
      </Layout>
    </>
  );
};

export default BlogTemplate;

export const pageQuery = graphql`
  query($path: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      excerpt(pruneLength: 160)
      id
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
        path
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
`;
