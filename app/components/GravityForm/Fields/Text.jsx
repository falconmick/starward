import React from 'react';
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

const updateField = (event, field) => {
  const { id, required } = field;
  const value = event.target ? event.target.value : null;
  const valid = textValdation(required, value);
  // this.props.updateForm(value, id, valid);
}

export default (props) => {
  const { field, value } = props; // , value, submitFailed, isValid

  // temp
  const submitFailed = false;
  const isValid = true;
  // temp
/*
                id
                label
                type
                defaultValue
                placeholder
                maxLength
                isRequired
                cssClass
                description
*/
  const { id, type, label, cssClass, placeholder, required, maxLength } = field;
  return (
    <div className={!isValid && submitFailed ? `field error ${cssClass}` : `field ${cssClass}`}>
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
            onChange={(event) => updateField(event, field)}
          />
        </label>
      </div>
    </div>
  );
};
