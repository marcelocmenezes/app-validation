import React from 'react'
import PropTypes from 'prop-types'

const SelectField = ({name, value, error, type, onChange, placeholder, children}) => (
  <div className="form-group">
    <select
      className={`form-control ${error ? 'is-invalid' : ''}`}
      type={type || 'text'}
      name={name}
      value={value}
      placeholder={placeholder || ''}
      onChange={onChange}
    >
      {children}
    </select>
    { error && <span className="invalid-feedback">{ error[0] }</span>}
  </div>
)

SelectField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.instanceOf(Array),
  placeholder: PropTypes.string,
  onChange: PropTypes.func
}

export default SelectField;
