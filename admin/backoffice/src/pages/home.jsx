import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import Template from '../components/Template';
function home() {

  return (
    <Template>
      Welcome to Admin SERVER
    </Template>
  )
}

export default home
