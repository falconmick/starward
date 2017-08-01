import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { Head } from '../components/Common/Head';
import { Loading } from '../components/Content/Loading';
import { FourOhFour } from '../components/Content/FourOhFour';
import { Title } from '../components/Content/Title';
import { RenderContent } from '../components/Content/RenderContent';
import { PostMeta } from '../components/Posts/PostMeta';
import { FeaturedImage } from '../components/Posts/FeaturedImage';
import { PostCategories } from '../components/Posts/PostCategories';
import { PostItemPagination } from '../components/Posts/PostItemPagination';
import { post } from '../utils/fragments';

class BlogPost extends Component {
  render() {
    const { post, settings, loading } = this.props;
    if (loading) return <Loading />;
    if (!post) return <FourOhFour />;
    const {
      title,
      date,
      author,
      featuredImage,
      content,
      categories,
      pagination,
      seo
    } = post;
    return (
      <main className="content" role="main">
        <Head {...seo} defaultTitle={`${title} - ${settings.name}`} />
        <article className="hentry">
          <Title title={title} />
          <PostMeta date={date} author={author} />
          <FeaturedImage
            size="large"
            {...featuredImage}
          />
          <RenderContent content={content} />
          <PostCategories categories={categories} />
          <PostItemPagination
            next={pagination.next}
            previous={pagination.previous}
          />
        </article>
      </main>
    );
  }
}

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
    ${post.fragments.post}
`;

export default graphql(pageQuery, {
  options: (props) => ({
    variables: {
      slug: props.params.post,
    },
  }),
  // props: ({ data: { loading, posts, categories, settings } }) => {
  //   return {
  //     loading,
  //     categories,
  //     settings,
  //     blog: posts.pageData,
  //     pagination: {
  //       page: posts.page,
  //       totalPages: posts.totalPages,
  //       totalItems: posts.totalItems,
  //     }
  //   };
  // }
})(BlogPost);

