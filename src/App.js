import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import Routers from './Routers/routes';
function App() {
  return (
    <Router>
      <Routers  />
    </Router>
  );
}

export default App;
