import { BrowserRouter, Route, Switch } from "react-router-dom";
import React, { useState } from 'react';
import './App.css';

import NavHeader from './components/header/nav-header';
import About from './pages/about/about';
import Todo from './pages/todo/todo';
import Detail from './pages/detail/detail';
import { LandingPage } from "./pages/landing/LandingPage";
import { RegisterPage } from "./pages/register/register";
import { TokenContext } from './context/';

import store from './i18n/store';
import { setLocale } from 'react-redux-i18n';

export const App: React.FC = () => {

  const [lang, setLang] = useState("en");

  const tempToken = (localStorage.getItem('token') ?? '');

  const [token, setToken] = useState(tempToken);

  const switchLocale = (code: string) => {
    store.dispatch(setLocale(code));
    if (lang !== code){
      setLang(code);
    }
  }

  return (

    <div className="App">
      <TokenContext.Provider
        value = {{token, setToken}}
      >
      <NavHeader switchLocale={switchLocale}/>
      <BrowserRouter basename="/">
        <Switch>
          <Route path="/" component={LandingPage} exact/>
          <Route path="/todo" component={Todo} exact/>
          <Route path="/todo/:id" component={Detail} exact/>
          <Route path="/about" component={About} exact/>
          <Route path="/regist" component={RegisterPage} exact/>
        </Switch>
      </BrowserRouter>
      </TokenContext.Provider>
    </div>

  );
}

