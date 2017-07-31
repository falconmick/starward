import React from 'react';
import { Categories } from './Categories';
import { PostListItem } from './PostListItem';
import { Pagination } from './Pagination';

export const PostList = props => {
  const {
    posts,
    categories,
    totalItems,
    totalPages,
    urlBase,
    currentPage
  } = props;
  if (!posts || posts.length < 1) {
    return <h3>No Posts Found</h3>;
  }
  return (
    <section className="posts">
      <Categories categories={categories} />
      <section className="posts_list">
        {posts.length < 1 ? <h2>No Posts Found</h2> : null}
        {posts.map((post, index) => <PostListItem key={index} {...post} />)}
      </section>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        urlBase={urlBase}
      />
    </section>
  );
};
