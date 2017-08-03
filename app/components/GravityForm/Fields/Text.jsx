import React, { Component } from 'react';
import { textValdation } from '../Helpers/validation';

/*

  componentWillMount() {
    this.updateField({target: null}, this.props.field);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.submitSuccess !== nextProps.submitSuccess) {
      this.updateField({target: null}, nextProps.field);
    }
  }
  updateField(event, field) {
    const { id, required } = field;
    const value = event.target ? event.target.value : null;
    const valid = textValdation(required, value);
    this.props.updateForm(value, id, valid);
  }

 */

export default (props) => {
  const { field } = this.props; // , value, submitFailed, isValid

  // temp
  const value = 'test';
  const submitFailed = false;
  const isValid = true;
  // temp

  const { id, type, label, classes, placeholder, required, maxLength } = field;
  return (
    <div className={!isValid && submitFailed ? `field error ${classes}` : `field ${classes}`}>
      <div className="text">
        <label htmlFor={id}>
          {label}{required ? <abbr>*</abbr> : null}
          <input
            name={id}
            type={type}
            value={!value ? '' : value}
            placeholder={placeholder}
            maxLength={maxLength}
            required={required}
            onChange={(event) => this.updateField(event, field)}
          />
        </label>
      </div>
    </div>
  );
};
