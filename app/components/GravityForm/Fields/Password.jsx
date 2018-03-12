import React, { Component } from 'react';
import { passwordValdation } from '../Helpers/validation';

export default class Password extends Component {
  constructor(props) {
    super(props);

    this.updateConfirmField = this.updateConfirmField.bind(this);
    this.updateField = this.updateField.bind(this);
  }
  componentWillMount() {
    this.updateField({target: null}, this.props.field);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.submitSuccess !== nextProps.submitSuccess) {
      this.updateField({target: null}, nextProps.field);
    }
  }
  updateField(event) {
    const { value: valueWithConfirm, field } = this.props;
    const [oldValue, confirmValue] = valueWithConfirm || [];
    const { id, required } = field;
    const value = event.target ? event.target.value : null;
    const valid = passwordValdation(required, value, confirmValue);
    this.props.updateForm([value, confirmValue], id, valid);
  }
  updateConfirmField(event) {
    const confirmValue = event.target ? event.target.value : null;
    const { value: valueWithConfirm, field, updateForm } = this.props;
    const [passwordValue] = valueWithConfirm;
    const { id, required } = field;

    const valid = passwordValdation(required, passwordValue, confirmValue);
    updateForm(passwordValue, id, valid);
  }
  render() {
    const { field, value: valueWithConfirm, submitFailed, isValid } = this.props;
    const [value, confirmValue] = valueWithConfirm || [];
    const { id, label, classes, required, maxLength } = field;
    const idConfirm = id + '-confirm';
    return (
      <div className={!isValid && submitFailed ? `field error ${classes}` : `field ${classes}`}>
        <div className="text">
          <label htmlFor={id}>
            {label}{required ? <abbr>*</abbr> : null}
            <input
              name={id}
              type="password"
              value={!value ? '' : value}
              placeholder="password"
              maxLength={maxLength}
              required={required}
              onChange={this.updateField}
            />
          </label>
          <label htmlFor={idConfirm}>
            Confirm{required ? <abbr>*</abbr> : null}
            <input
              name={idConfirm}
              type="password"
              value={!confirmValue ? '' : confirmValue}
              placeholder="password"
              maxLength={maxLength}
              required={required}
              onChange={this.updateConfirmField}
            />
          </label>
        </div>
      </div>
    );
  }
}
