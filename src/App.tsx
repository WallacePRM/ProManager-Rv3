import React from 'react';
import './App.css';
import Projects from './components/pages/Projects';
import Tasks from './components/pages/Tasks';
import Login from './components/pages/Login';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import Signup from './components/pages/Signup';
import Forgot from './components/pages/forgot';

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login/forgot" element={<Forgot/>}/>
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/projects/:id" element={<Tasks/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
