import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Head } from '../components/Common/Head';
import { Loading } from '../components/Content/Loading';
import { FourOhFour } from '../components/Content/FourOhFour';
import { Title } from '../components/Content/Title';
import { RenderContent } from '../components/Content/RenderContent';
import { PostMeta } from '../components/Posts/PostMeta';
import { FeaturedImage } from '../components/Posts/FeaturedImage';
import { PostCategories } from '../components/Posts/PostCategories';
import { postFragment } from '../apollo/fragments';

const BlogPost = props => {
  const { post, settings, loading } = props;
  if (loading) return <Loading />;
  if (!post) return <FourOhFour />;


  // pagination, // pagination was removed due to requirement to query all posts
  // to figure this out. It can be added in again, however not all sites use
  // this so I've just decided to remove.
  const {
    title,
    modified,
    author,
    featuredImage,
    content,
    categories,
    seo
  } = post;
  return (
    <main className="content" role="main">
      <Head {...seo} defaultTitle={`${title} - ${settings.name}`} />
      <article className="hentry">
        <Title title={title} />
        <PostMeta modified={modified} author={author} />
        <FeaturedImage
          size="large"
          {...featuredImage}
        />
        <RenderContent content={content} />
        <PostCategories categories={categories} />
      </article>
    </main>
  );
};

// function mapStateToProps({starward, loading}) {
//   const { settings, activePost } = starward;
//   return {
//     loading,
//     settings,
//     post: activePost
//   };
// }

// export default connect(mapStateToProps, { })(BlogPost)

const pageQuery = gql`
    query BlogPostQuery($slug: String!) {
        post(slug: $slug) {
            ...singlePost
        }
        settings {
            name
        }
    }
    ${postFragment.post}
`;

export default graphql(pageQuery, {
  options: (props) => ({
    variables: {
      slug: props.params.post,
    },
  }),
  props: ({ data: { loading, post, settings } }) => {
    return {
      loading,
      post,
      settings,
    };
  }
})(BlogPost);

