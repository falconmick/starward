import { Component } from 'react';
import PropTypes from 'prop-types';

export class DisableScroll extends Component {
  componentDidMount() {
    document.body.classList.toggle('no-scroll', this.props.disableScroll);
    document.getElementsByTagName('html')[0].classList.toggle('no-scroll', this.props.disableScroll);
  }
  componentWillReceiveProps(nextProps) {
    document.body.classList.toggle('no-scroll', nextProps.disableScroll);
    document.getElementsByTagName('html')[0].classList.toggle('no-scroll', nextProps.disableScroll);
  }
  componentWillUnmount() {
    document.body.classList.remove('no-scroll');
    document.getElementsByTagName('html')[0].classList.remove('no-scroll');
  }
  render() {
    return null;
  }
}

DisableScroll.defaultProps = {
  disableScroll: false,
};

DisableScroll.propTypes = {
  disableScroll: PropTypes.bool,
};
