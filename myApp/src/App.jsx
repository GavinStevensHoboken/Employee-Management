import { useState } from 'react';
import  NavBar  from './navigation/navBar.jsx';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import EmployeeProfiles from './employees/employeeProfiles.jsx';

function App() {

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/employees" element={<EmployeeProfiles />} />
      </Routes>
    </Router>
  )
}

export default App
