import React,{useState, useEffect} from 'react'
import { languageChange} from '../redux/languageSlice'
import { useDispatch, useSelector } from 'react-redux'
import  {Link} from 'react-router-dom'

const Header = () => {
 
  const {language} = useSelector(state => state.language) 
  const dispatch = useDispatch() 

  return (
    <header>
        <div className='logo'>
          <Link to="/" >Logo</Link>
        </div>
        <div className="language-selector__container">
          <label>
            <select className="js_language_selector" onChange={e => dispatch(languageChange(e.target.value))} >
              <option value="0" 
                className='en'
              >
                <i className="fa fa-envelope"></i>
                English
              </option>
              <option value="1" className='tr'>
                Turkish
              </option>
              <option value="2" className='cn'>
                Chinese
              </option>
              <option value="3" className='he'>
                Hebrew
              </option>
            </select>
          </label>
        </div>
    </header>
  )
}

export default Header