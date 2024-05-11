import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Search from './pages/Search';
import Menu from './pages/Menu';
import EditarMenu from './pages/EditarMenu';
import Home from './pages/Home';
import Pedidos from './pages/Pedidos';
import Waiting from './pages/Waiting';

function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Search />} />
      <Route path='/home' element={<Home />} />    
      <Route path='/pedidos' element={<Pedidos />} />
      <Route path='/pedir' element={<Menu />} />
      <Route path='/waiting' element={<Waiting />}/>
      <Route path='/editarMenu' element={<EditarMenu/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
