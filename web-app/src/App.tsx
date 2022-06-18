import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CustomCalendar from './views/CustomCalendar';
import Login from './views/Login';
import HomePage from './views/HomePage';
import SignUp from './views/SignUp';

import NavigationBar from './components/NavigationBar';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';
import './styles/colors.css';
import './styles/fonts.css';
import './styles/sizes.css';
import './styles/spacing.css';

const App = () => {
  useEffect(() => {
    document.body.style.backgroundColor = '#222831';
  }, []);

  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" key={'home'} element={<HomePage />} />
        <Route
          path="/custom-calendar"
          key={'calendar'}
          element={<CustomCalendar />}
        />
        <Route path="/login" key={'login'} element={<Login />} />
        <Route path="/login/sign-up" key={'signup'} element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
