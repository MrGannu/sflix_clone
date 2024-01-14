import React, { useContext } from 'react'
import "../styles/alert.css"

const Alert = ({alertMessage}) => {
  return (
    <div className='alert_model'>
      {alertMessage.type === "success" ? (
        <img src="/images/success.png" alt="success-img" />
      ) : alertMessage.type === "error" ? (
        <img src="/images/error.png" alt="success-img" />
      ) : alertMessage.type === "warning"? (
        <img src="/images/warning.png" alt="success-img" />
      ) : null
      }
      <p>{alertMessage.message}</p>
    </div>
  )
}

export default Alert