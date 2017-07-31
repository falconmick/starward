import React from 'react';
import { Link } from 'react-router';

const getNextPageNumber = (currentPage) => {
  let foward = currentPage;
  let backward = currentPage;
  let goFoward = true;
  return () => {
    if (goFoward) {
      foward += 1;
      goFoward = false;
      return foward;
    }

    goFoward = true;
    backward -= 1;
    return backward;
  };
};

// todo: Please test me
const createPageArray = (totalPages, currentPage, totalLinks) => {
  const pageList = [1];
  if (totalPages <= 1) {
    return pageList;
  }
  pageList.push(totalPages);

  if (currentPage !== 1 && currentPage !== totalPages) {
    pageList.push(currentPage);
  }

  const netPageNumber = getNextPageNumber(currentPage);
  while (totalLinks > pageList.length && totalPages > pageList.length) {
    const nextPageNumber = netPageNumber();

    // if nextPageNumber is less than or equal to 1, it means that we no longer need show
    // any more of those as we have reached already existing links
    // if it is larger than or equal to totPages, same deal as less except for max page number
    if (nextPageNumber > 1 && nextPageNumber < totalPages) {
      pageList.push(nextPageNumber);
    }
  }

  pageList.sort((a, b) => a - b);
  return pageList;
};

// reselect would be very good here!
const createPageLinks = (totalPages, currentPage, urlBase, totalLinks = 7) => {
  const pageList = createPageArray(totalPages, currentPage, totalLinks);

  const pageLinkArray = pageList.map(page => {
    return {
      pageNumber: page,
      url: `/${urlBase}/page/${page}`
    };
  });

  return pageLinkArray;
};

export const Pagination = props => {
  const { totalPages, currentPage, urlBase } = props;
  if (totalPages < 1) {
    return <span />;
  }
  const pageList = createPageLinks(totalPages, currentPage, urlBase);

  return (
    <nav className="page_nav">
      <ul>
        {pageList.map(page => (
          <li key={page.pageNumber} className={currentPage === page.pageNumber ? 'page active' : 'page'}>
            <Link to={page.url}>
              {page.pageNumber}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
