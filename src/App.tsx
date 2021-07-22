import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from 'react';
import { useState } from "react";
import './App.css';

import NavHeader from './components/header/nav-header';
import About from './pages/about/about';
import Todo from './pages/todo/todo';
import Detail from './pages/detail/detail';
import { LandingPage } from "./pages/landing/LandingPage";

import { connect } from 'react-redux';
import store from './i18n/store';
import { setLocale } from 'react-redux-i18n';

const App: React.FC = () => {
  const [lang, setLang] = useState("en");

  const switchLocale = (code: string) => {
    store.dispatch(setLocale(code));
    if (lang !== code){
      setLang(code);
    }
  }

  return (
    <div className="App">
      <NavHeader switchLocale={switchLocale}/>
      <BrowserRouter basename="/">
        <Switch>
          <Route path="/" component={LandingPage} exact/>
          <Route path="/todo" component={Todo} exact/>
          <Route path="/todo/:id" component={Detail} exact/>
          <Route path="/about" component={About} exact/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default connect()(App);
