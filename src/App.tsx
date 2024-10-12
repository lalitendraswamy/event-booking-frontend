import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/HomePage/HomePage';
import LoginPage from './components/authentication/LoginPage';

const App: React.FC = () => {
  return (

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage/>}/>
          
        </Routes>
      </Router>

  );
};

export default App;
