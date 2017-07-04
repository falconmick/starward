import React, { Component } from 'react';
import {
  gql,
  graphql,
} from 'react-apollo';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Header } from '../components/Common/Header';
import { Footer } from '../components/Common/Footer';
import { TrackingScript } from '../components/Common/TrackingScript';

class App extends Component {
  render() {
    const { children, data, location } = this.props;
    const { settings, headerMenu } = data;
    return (
      <div className={location.pathname === '/' ? 'home' : location.pathname.replace(/\//g, '')}>
        <Header
          siteName={settings.name}
          navigation={headerMenu && headerMenu.length > 0 ? headerMenu : []}
          currentPath={location.pathname}
        />
        {children}
        <Footer siteName={settings.name} />
        <TrackingScript
          type={!settings.trackingType ? 'none' : settings.trackingType}
          id={!settings.trackingId ? '' : settings.trackingId}
        />
      </div>
    );
  }
}

function mapStateToProps({starward, loading}) {
  return {
    loading,
    starward
  };
};

const menuQuery = gql`
  fragment menuFragment on MenuItem {
    url
    title
    classes
  }

  query headerMenu($slug:String!)
  {
    headerMenu: menuItems(slug: $slug) {
      ...menuFragment
      children {
        ...menuFragment
          children {
          ...menuFragment
        }
      }
    }
    settings {
      trackingType
      trackingId
      name
    }
  }

`;

const apollo = graphql(menuQuery, {
  options: () => ({
    variables: { slug: 'primary_navigation' },
  }),
});

const redux = connect(mapStateToProps, { });

export default compose(apollo, redux)(App);