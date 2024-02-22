import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignUpSide from './components/SignUp'
import SignInSide from './components/SignIn'
import CropDetails from './components/CropDetails'
import BuyerInSide from './components/BuyerSignIn'
import BuyerSignUp from './components/BuyerSignUp'
import {BrowserRouter as Router , Route, Routes} from "react-router-dom"
import UploadCrop from './components/UploadCrop'

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/farmersignin" element={<SignInSide/>}/>
        <Route path="/farmersignup" element={<SignUpSide/>}/>
        <Route path='/buyersignin' element={<BuyerInSide/>}/>
        <Route path='/buyersignup' element={<BuyerSignUp/>}/>
        <Route path='/cropdetails' element={<CropDetails/>}/>
        <Route path='/uploadCrop' element= {<UploadCrop/>}/>
      </Routes>
    </Router>
  )
}

export default App
