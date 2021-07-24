import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from 'react';
import { useState, createContext, useContext } from "react";
import './App.css';

import NavHeader from './components/header/nav-header';
import About from './pages/about/about';
import Todo from './pages/todo/todo';
import Detail from './pages/detail/detail';
import { LandingPage } from "./pages/landing/LandingPage";
import { RegisterPage } from "./pages/register/register";

import { User_context } from './interface/userInterface';

import store from './i18n/store';
import { setLocale } from 'react-redux-i18n';

export const TokenContext = createContext<User_context>(
  {
    token: '',
    setToken: () => {},

  }
);

export const useTokenContext = () => useContext(TokenContext);

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

