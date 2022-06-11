import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavigationBar from './components/NavigationBar';

const App = () => {
  return (
    <div className="App">
      <NavigationBar />
      <p>React app</p>
    </div>
  );
};

export default App;
