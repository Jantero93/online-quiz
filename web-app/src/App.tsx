import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AddQuestion from './views/AddQuestion';
import HomePage from './views/HomePage';
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
