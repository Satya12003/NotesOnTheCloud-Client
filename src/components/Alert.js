import React from 'react'

function Alert(props) {
  return (
      props.alert && <div className={`alert alert-${props.alert.typ} alert-dismissible fade show d-flex justify-content-center`} role="alert">

        <strong>{props.alert.msg}</strong>
    </div>
  )
}

export default Alert
