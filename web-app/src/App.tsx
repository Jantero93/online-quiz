import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AddQuestion from './views/AddQuestion';
import Login from './views/Login';
import HomePage from './views/HomePage';
import SignUp from './views/SignUp';

import NavigationBar from './components/NavigationBar';

import 'bootstrap/dist/css/bootstrap.min.css';
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
        {/* Main */}
        <Route path="/" key={'home'} element={<HomePage />} />
        <Route path="/login" key={'login'} element={<Login />} />
        <Route path="/login/sign-up" key={'signup'} element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
        {/* Quiz */}
        <Route
          path="/question/add"
          key={'add-question'}
          element={<AddQuestion />}
        />
      </Routes>
    </Router>
  );
};

const NotFound = () => <div className="_ColorDepth-4">Not found 404</div>;

export default App;
