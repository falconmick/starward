import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import ReactSelect, { components } from 'react-select';
import { SVGIcon } from '../SVGIcon';

const DropdownIndicator = (props) => {
  const { selectProps } = props;
  const { menuIsOpen } = selectProps;
  return (
    <components.DropdownIndicator {...props}>
      <SVGIcon name="dow_arrow_select" useSvgSize className={cx({'menu-is-open': menuIsOpen})} />
    </components.DropdownIndicator>
  );
};

const customStyles = {
  menu: (base, state) => ({
    ...base,
    marginTop: '0',
    borderRadius: '1px',
    borderColor: '#08415C',
    borderWidth: '1px',
    borderStyle: 'solid',
  }),
  indicatorSeparator: (base, state) => ({
    ...base,
    width: 0,
  }),
  control: (base, state) => {
    // console.log(state);
    const { isFocused } = state;
    const conditionalStyles = {};

    if (isFocused) {
      conditionalStyles.boxShadow = '0 0 0 1px #08415C';
    }

    return {
      ...base,
      ...conditionalStyles,
      backgroundColor: '#EFF3F9',
      borderRadius: '1px',
      borderStyle: 'none',
    };
  },
  option: (base, state) => {
    const { isSelected, isFocused } = state;
    const { backgroundColor: defaultBackground } = base;

    let backgroundColor = defaultBackground;

    backgroundColor = isFocused ? '#16B2DE' : backgroundColor;
    backgroundColor = isSelected ? '#08415C' : backgroundColor;

    return {
      ...base,
      fontFamily: 'Muli, sans-serif',
      fontWeight: '400',
      fontSize: '15px',
      lineHeight: '20px',
      padding: '14px 12px',
      color: (isSelected || isFocused) ? '#EFF3F9' : '#6A787D',
      backgroundColor,
    };
  },
  singleValue: (base, state) => {
    return {
      ...base,
      fontFamily: 'Muli, sans-serif',
      fontWeight: '600',
      fontSize: '15px',
      lineHeight: '20px',
      color: '#79858A',
      // color: '#45565C',
    };
  },
  menuList: (base, state) => ({
    ...base,
    padding: '0',
  }),
};


export const Select = props => {
  const { options, defaultValue, onChange} = props;

  return (
    <ReactSelect
      className="starward-select"
      components={{ DropdownIndicator }}
      options={options}
      styles={customStyles}
      defaultValue={defaultValue}
      onChange={onChange}
      // menuIsOpen
    />
  );
};

Select.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  defaultValue: PropTypes.func,
};
