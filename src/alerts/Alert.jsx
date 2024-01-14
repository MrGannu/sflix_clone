import React, { useContext } from 'react'
import "../styles/alert.css"

const Alert = ({alertMessage}) => {
    // {title, message, type}
  return (
    <div className='alert_model'>
        <h3>Title</h3>
        <p>{alertMessage}</p>
    </div>
  )
}

export default Alert