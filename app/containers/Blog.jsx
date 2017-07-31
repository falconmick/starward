import React, { Component } from 'react';
import {
  gql,
  graphql,
} from 'react-apollo';
import { BLOG_SLUG, POSTS_PER_PAGE } from '../../config/app';
import { Head } from '../components/Common/Head';
import { Title } from '../components/Content/Title';
import { RenderContent } from '../components/Content/RenderContent';
import { Loading } from '../components/Content/Loading';
import { FourOhFour } from '../components/Content/FourOhFour';
import { PostList } from '../components/Posts/PostList.jsx';
import { post } from '../utils/fragments';

const Blog = (props) => {
  const { blog, settings, loading, categories, pagination } = props;
  const { page, totalPages, totalItems } = pagination;
  const pageTitle = 'blog';

  if (loading) return <Loading />;
  if (!blog) return <FourOhFour />;
  return (
    <main className="content" role="main">
      <Head {...page.seo} defaultTitle={`${pageTitle} - ${settings.name}`} />
      <Title title={pageTitle} />
      <PostList
        posts={blog}
        categories={categories}
        totalItems={totalItems}
        totalPages={totalPages}
        urlBase={BLOG_SLUG}
        currentPage={page}
       />
    </main>
  );
};

// function mapStateToProps({starward, loading}) {
//   const { page, posts, settings } = starward;
//   return {
//     loading,
//     page,
//     settings,
//     blog: posts
//   };
// }
//
// export default connect(mapStateToProps, { })(Blog);

const pageQuery = gql`
    query PageQuery($page:Int, $perPage:Int) {
        posts(page:$page, perPage:$perPage) {
            ...archivePost
        }
        categories {
            slug
            name
        }
        settings {
            name
        }
    }
    ${post.fragments.archives}
`;

export default graphql(pageQuery, {
  options: (props) => ({
    variables: {
      page: props.params.page || 1,
      perPage: props.params.perPage || POSTS_PER_PAGE
    },
  }),
  props: ({ data: { loading, posts, categories, settings } }) => {
    return {
      loading,
      categories,
      settings,
      blog: posts.pageData,
      pagination: {
        page: posts.page,
        totalPages: posts.totalPages,
        totalItems: posts.totalItems,
      }
    };
  }
})(Blog);
