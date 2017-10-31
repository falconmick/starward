import React, { Component } from 'react';
import {
  gql,
  graphql,
  compose,
} from 'react-apollo';
import { Loading } from '../components/Content/Loading';
import { FourOhFour } from '../components/Content/FourOhFour';
import { PageContent } from '../components/Page/PageContent';
import { pageFragment } from '../../apollo/fragments';

class Page extends Component {
  render() {
    const { pageIsLoading, data = {} } = this.props;
    const { page, settings } = data;

    // if all queries attachd to this page are not loading, we are loaded!
    if (pageIsLoading) return <Loading />;
    if (!page) return <FourOhFour />;
    return <PageContent {...page} siteName={settings.name} />;
  }
}

const pageQuery = gql`
    query PageQuery($splat: String) {
        page(splat: $splat) {
            ...defaultPage
        }
        settings {
            name
        }
    }
    ${pageFragment.page}
`;

export const createCustomPage = ({gqlQueries = []}) => {
  const queries = [];
  // regular fetch
  queries.push(
    graphql(pageQuery, {
      options: (props) => ({
        variables: {splat: props.location.pathname},
      }),
      props: (props) => {
        const { data, pageIsLoading } = props;
        // if the network status is < 7 it means we are loading
        const { networkStatus } = data;
        const queryIsLoading = networkStatus < 7;
        return {
          ...props,
          // if any past query or this query is loading, page is loading
          pageIsLoading: pageIsLoading || queryIsLoading
        };
      }
    })
  );
  // prefetch
  gqlQueries.forEach(gqlQuery => {
    const { query, getVariables } = gqlQuery;
    queries.push(
      graphql(query, {
        options: (props) => ({
          variables: getVariables(props),
        }),
        props: (props) => {
          const { data, pageIsLoading } = props;
          // if the network status is < 7 it means we are loading
          const { networkStatus } = data;
          const queryIsLoading = networkStatus < 7;
          return {
            // if any past query or this query is loading, page is loading
            pageIsLoading: pageIsLoading || queryIsLoading
          };
        }
      })
    );
  });
  return compose(...queries)(Page);
};

export default createCustomPage({});
