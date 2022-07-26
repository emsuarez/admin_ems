import React, { useEffect } from 'react'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Toast = props => {
  console.log('yooo', props)
  const { message } = props

  useEffect(() => {
    const showToast = () => {
      if (props.isToastShowing) {
        toast(message, {
          toastId: message + Date.now(),
        })
        setTimeout(() => {
          props.clearToast()
        }, 5000)
      }
    }

    showToast()
  }, [])

  return (
    <div>
      <ToastContainer message={message} />
    </div>
  )
}

export default Toast
