import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { Router, Route, Routes } from 'react-router-dom';
import ListAlbum from './pages/ListAlbum';
import AddAlbum from './pages/AddAlbum';
import ListSong from './pages/ListSong';
import AddSong from './pages/AddSong';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

export const url = 'http://localhost:4000'

const App = () => {
  return (
    <div className='flex items-start min-h-screen'>
      <ToastContainer/>
      <Sidebar />

      <div className='flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]'>
        <Navbar/>
        <div className='pt-8 pl-5 sm:pt:12 sm:pl-12'>
          <Routes>
            <Route path='/list-album' element={<ListAlbum />} />
            <Route path='/add-album' element={<AddAlbum />} />
            <Route path='/list-song' element={<ListSong />} />
            <Route path='/add-song' element={<AddSong />} />    
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App