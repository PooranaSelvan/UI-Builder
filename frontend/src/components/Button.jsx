import React from 'react'

const Button = ({className = '', style = {}, children, ...props}) => {
  return <button className={className} style={style} {...props}>{children}</button>
}

export default Button;