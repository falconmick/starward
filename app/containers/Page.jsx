import React, { Component } from 'react';
import {
  gql,
  graphql,
} from 'react-apollo';
import { Loading } from '../components/Content/Loading';
import { FourOhFour } from '../components/Content/FourOhFour';
import { PageContent } from '../components/Page/PageContent';

class Page extends Component {
  render() {
    const { loading, data = {} } = this.props;
    const { page, settings } = data;

    if (loading) return <Loading />;
    if (!page) return <FourOhFour />;
    return <PageContent {...page} siteName={settings.name} />;
  }
}

const pageQuery = gql`
  query PageQuery($slug: String!) {
      page(slug: $slug) {
          id
          date
          acf
      }
      settings {
          name
      }
  }
`;

export default graphql(pageQuery, {
  options: (props) => ({
    variables: { slug: props.route.name },
  }),
})(Page);
