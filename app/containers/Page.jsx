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
    query PageQuery($splat: String) {
        page(splat: $splat) {
            acf {
                layout
            }
            yoast {
                focuskw
                title
                metadesc
                linkdex
                metakeywords
                canonical
                redirect
            }
        }
        settings {
            name
        }
    }
`;

export default graphql(pageQuery, {
  options: (props) => ({
    variables: { splat: props.params.splat },
  }),
})(Page);
