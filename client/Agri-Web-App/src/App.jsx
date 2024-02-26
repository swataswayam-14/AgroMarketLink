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
import FarmersList from './components/FarmerList'
import FarmerDetails from './components/FarmerDetails'
import DashBoard from './components/DashBoard'
import FarmerProfile from './components/FarmerProfile'
import BuyerProfile from './components/BuyerProfile'
import FarmerCrop from './components/FarmerCrop'
import EditFarmerAccount from './components/EditFarmerAccount'
import EditBuyerAccount from './components/EditBuyerProfile'
import DeleteCurrent from './components/DeleteCurrent'


function App() {


  return (
    <Router>
      <Routes>
        <Route path='/' element={<DashBoard/>}/>
        <Route path="/farmersignin" element={<SignInSide/>}/>
        <Route path="/farmersignup" element={<SignUpSide/>}/>
        <Route path='/buyersignin' element={<BuyerInSide/>}/>
        <Route path='/buyersignup' element={<BuyerSignUp/>}/>
        <Route path='/cropdetails/:id' element={<CropDetails/>}/>
        <Route path='/uploadCrop/:id' element= {<UploadCrop/>}/>
        <Route path='/farmers' element = {<FarmersList/>}/>
        <Route path='/farmers/:id' element={<FarmerDetails/>}/>
        <Route path='/profile/:id' element={<FarmerProfile/>}/>
        <Route path='/buyer/:id' element={<BuyerProfile/>}/>
        <Route path='/farmercrop/:id' element={<FarmerCrop/>}/>
        <Route path='/editaccount/:id' element={<EditFarmerAccount/>}/>
        <Route path='/editbuyer/:id' element = {<EditBuyerAccount/>}/>
        <Route path='/deletecurrent/:id' element={<DeleteCurrent/>}/>
      </Routes>
    </Router>
  )
}

export default App
