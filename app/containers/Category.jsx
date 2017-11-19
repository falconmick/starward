import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CATEGORY_SLUG } from '../config/app';
import { Head } from '../components/Common/Head';
import { Title } from '../components/Content/Title';
import { Loading } from '../components/Content/Loading';
import { FourOhFour } from '../components/Content/FourOhFour';
import { PostList } from '../components/Posts/PostList.jsx';


/*
NOTE:
Has not been updated to use Apollo GraphQL, this will
be a PR on the main distilagency starward repo,
if your project needs the ability to filter by
category, either go into Blog and add a check
that looks for a category querystring param OR
imprement a way to show here, if you can make
the code re-usable that would be really helpful
as custom post types have their own taxonomies
and copy/paste frameworks suck :(

https://github.com/distilagency/starward/issues/91

 */

class Category extends Component {
  render() {
    const { category, loading, settings, params } = this.props;
    if (loading) return <Loading />;
    if (!category) return <FourOhFour />;
    const { details, posts } = category;
    const { items, totalItems, totalPages } = posts;
    return (
      <main className="content" role="main">
        <Head defaultTitle={`${details.name} - ${settings.name}`} />
        <Title title={details.name} />
        <PostList
          posts={items}
          totalItems={totalItems}
          totalPages={totalPages}
          urlBase={`${CATEGORY_SLUG}/${params.slug}`}
          currentPage={params.page}
         />
      </main>
    );
  }
}

function mapStateToProps({starward, loading}) {
  const { category, settings } = starward;
  return {
    loading,
    category,
    settings
  };
}

export default connect(mapStateToProps, { })(Category);
