import React from 'react';

import NavigationBar from './components/NavigationBar';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/colors.css';

const App = () => {
  return (
    <div className="_ColorDepth-Bg-1">
      <NavigationBar />
      <p>React app</p>
    </div>
  );
};

export default App;
