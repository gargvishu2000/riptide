import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import About from './pages/About'
import Collection from './pages/Collection'
import Contact from './pages/Contact'
import Home from './pages/Home'
import { ToastContainer, toast } from 'react-toastify';
import Product from './pages/Product'
import Admin from './pages/Admin'




const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      {/* Navbar will be shown in all the pages because we have mounted it before Routes */}
      {/* Toast Container for notifications */}
      <ToastContainer /> 
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/admin/*' element={<Admin /> } />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
