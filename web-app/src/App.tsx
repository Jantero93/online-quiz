import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CustomCalendar from './views/CustomCalendar';
import HomePage from './views/HomePage';
import NavigationBar from './components/NavigationBar';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/colors.css';
import './styles/fonts.css';

const App = () => {
  useEffect(() => {
    document.body.style.backgroundColor = '#222831';
  }, []);

  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/custom-calendar" element={<CustomCalendar />} />
      </Routes>
    </Router>
  );
};

export default App;
