import React, { useEffect } from 'react';

import NavigationBar from './components/NavigationBar';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/colors.css';
import './styles/fonts.css';

const App = () => {
  useEffect(() => {
    document.body.style.backgroundColor = '#222831';
  }, []);

  return (
    <div className="_ColorDepth-Bg-1" style={{ height: '100%' }}>
      <NavigationBar />
    </div>
  );
};

export default App;
