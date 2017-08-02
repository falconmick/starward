import React from 'react';

export const Button = props => {
  const { text, showLoading, className } = props;
  return (
    <button type="submit" className={`button ${className}`}>{showLoading ? 'Loading' : text}</button>
  );
};

const getButtonClasses = (isValid, loading) => {
  if (loading) return 'loading';
  else if (!isValid) return 'disabled';
  return 'active';
}

export const FormButton = props => {
  const { isValid, showLoading, className, ...otherProps } = props;
  const formClassName = getButtonClasses(isValid, showLoading);
  const customClassName = className ? `${formClassName} ${className}` : formClassName;
  return (
    <Button {...otherProps} showLoading={showLoading} className={customClassName} />
  );
};
