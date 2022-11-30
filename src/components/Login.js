import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDataUsers, loginUser } from '../redux/authApi'
import avatar from '../avatar.jpg'

const Login = () => {
    const [name, setName] = useState('')
    const [psw, setPsw] = useState('')
    const {data, login, warning} = useSelector(state => state.users) 
    const {language} = useSelector(state => state.language) 
    const dispatch = useDispatch()  
    
    const loginHandle = (e) => {
        e.preventDefault()
        dispatch(loginUser({
            name,
            psw
        }))
        setName('')
        setPsw('')
    }
  
  useEffect(()=> {
    dispatch(fetchDataUsers())
  },[name,psw])
  
  return (
    <>
        <div className='row'>
            <div className="login-form">
                <form onSubmit={loginHandle}>
                <h1>{language[0].login}</h1>
                    <div className="imgcontainer">
                        <img src={avatar} alt="Avatar" className="avatar"/>
                    </div>
                    <div className="form-group">
                        <input type="name" name="name" placeholder={language[0].userName} value={name} onChange={(e) => setName(e.target.value)}/>
                        <span className="input-icon"><i className="fa fa-envelope"></i></span>
                    </div>
                    <div className="form-group">
                        <input type="password" name="psw" placeholder={language[0].password} value={psw} onChange={(e) => setPsw(e.target.value)}/>
                        <span className="input-icon"><i className="fa fa-lock"></i></span>
                    </div>
                    <button className="login-btn" type='submit'>{language[0].login}</button>     
                </form>
            </div>
        </div>
        <div className='row text-center'>
            {
                warning && <p>{language[0].warning}</p>
            }
        </div>
    </>
  )
}

export default Login