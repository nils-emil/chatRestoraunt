import React from 'react'
import './styles.scss'

export const variants = {
  DARK: 'dark',
  LIGHT: 'light'
}


export const types = {
  NUMERIC: 'NUMERIC',
  ALPHANUMERIC: 'ALPHANUMERIC',
  PRICE: 'PRICE'
}

function TextField(props) {

  const { onChange, value, type, label, variant = variants.DARK, autoFocus } = props

  const handleChange = (event) => {
    onChange(event.target.value)
  }

  return (
    <div className={`text-field text-field--${variant}`}>
      <label className="text-field__label">{label}</label>
      <input
        className="text-field__input"
        type={type === types.PRICE || type === types.NUMERIC ? 'number' : 'text'}
        value={value}
        onChange={handleChange}
        placeholder={label}
        autoFocus={autoFocus}
      />
    </div>
  )
}

export default TextField