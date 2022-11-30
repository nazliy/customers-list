import React from 'react'
import Login from './Login'
import Customers from './Customers'
import {  loginUser } from '../redux/authApi'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
    const {data, login} = useSelector(state => state.users) 
   
  return (
    <main>
        {
            login ?  <Login/> : <Customers />
        }
       
    </main>
  )
}

export default Home