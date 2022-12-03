import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AddQuestion from './views/AddQuestion';
import GamePlay from './components/game/GamePlay';
import NavigationBar from './components/NavigationBar';
import Play from './views/Play';

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
        <Route path="/" key="home" element={<Play />} />
        <Route path="*" element={<NotFound />} />
        {/* Question */}
        <Route
          path="/question/add"
          key="add-question"
          element={<AddQuestion />}
        />
        {/* Game play */}
        <Route path="game/:gameId" key="GamePlay" element={<GamePlay />} />
      </Routes>
    </Router>
  );
};

const NotFound = () => <div className="_ColorDepth-4">Not found 404</div>;

export default App;
