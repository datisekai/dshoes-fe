import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'
import Login from '../../components/Form/Login'
import Header from '../../components/Header/Header'

const LoginPage = () => {
  const user = useSelector(state => state.user);

  if(user && user.user)
  {
    return <Navigate to={'/'}/>
  }


  return (
    <>
    <Header/>
    <Login/>
    <Footer/>
    </>
  )
}

export default LoginPage