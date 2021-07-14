import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from 'react';

import './App.css';

import NavHeader from './components/header/nav-header';
import About from './components/about/about';
import Todo from './components/todo/todo';
import Detail from './components/detail/detail';

const App: React.FC = () => {

  return (
    <div className="App">
      <NavHeader />
      <BrowserRouter basename="/">
        <Switch>
          <Route path="/todo" component={Todo} exact/>
          <Route path="/todo/:id" component={Detail} exact/>
          <Route path="/about" component={About} exact/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
