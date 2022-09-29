import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from './screens/products';
import Invoice from './screens/invoice';
import Report from './screens/report';
import Header from '../src/components/navbar';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
        <Routes>
          <Route path='/products' element={<Products/>}/>
          <Route path='/invoice' element={<Invoice/>}/>
          <Route path='/reports' element={<Report/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
