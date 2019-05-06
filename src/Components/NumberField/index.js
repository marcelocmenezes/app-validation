
import React from 'react'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'


const SelectField = ({name, value, error, type, onChange, placeholder, prefix, mask, thousandSeparator, decimalSeparator, fixedDecimalScale, decimalScale, format}) => (
  <div className="form-group">
    <NumberFormat
      className={`form-control ${error ? 'is-invalid' : ''}`}
      type={type || 'text'}
      name={name}
      value={value}
      placeholder={placeholder || ''}
      onChange={onChange}
      
      prefix={prefix || ''}
      mask={mask || ''}
      
      thousandSeparator={thousandSeparator}
      
      decimalSeparator={decimalSeparator || false}
      fixedDecimalScale={fixedDecimalScale || false}
      decimalScale={decimalScale}

      format={format}
    />
    
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