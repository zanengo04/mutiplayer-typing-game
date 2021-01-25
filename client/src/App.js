import React from 'react';

import Typing from './components/Typing'
import Welcome from './components/Welcome'
import { HashRouter, Route, Switch } from "react-router-dom";
function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/game" component={Typing} />
      </Switch>
    </HashRouter>
  );
}

export default App;
