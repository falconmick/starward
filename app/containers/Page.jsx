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
    const { page, settings, loading } = this.props;
    if (loading) return <Loading />;
    if (!page) return <FourOhFour />;
    return <PageContent {...page} siteName={settings.name} />;
  }
}

const pageQuery = gql`
  query query {
      settings {
          name
      }
  }
`;

export default graphql(pageQuery)(Page);
