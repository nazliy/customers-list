
import React, {useEffect} from 'react'

import { BrowserRouter, Routes, Route} from 'react-router-dom' 
import Header from './components/Header'
import Home from './components/Home'
import Detail from './components/Detail'
import {  useSelector } from 'react-redux'

function App() {

  const {language} = useSelector(state => state.language) 

  useEffect(() => {
    console.log(language[0].direction)
    language[0].direction ? document.body.classList.add('direction_rtl') : document.body.classList.remove('direction_rtl')    
  },[language])

  return (
    <>
      <BrowserRouter>
      <Header/>
        <Routes>      
          <Route path='/' element={<Home/>}/>
          <Route path='/customer/:id' element={<Detail/>}/>
        </Routes>
      </BrowserRouter>
   
    </>
  );
}

export default App;
