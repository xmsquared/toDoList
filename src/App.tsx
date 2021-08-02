import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import React, { useEffect, useState } from 'react';
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
  const storedToken = localStorage.getItem('token');
  const tempToken = storedToken != null ? JSON.parse(storedToken) : null;

  const [token, setToken] = useState(tempToken);
  const [login, setLogin] = useState(false);

  const switchLocale = (code: string) => {
    store.dispatch(setLocale(code));
    if (lang !== code){
      setLang(code);
    }
  }

  useEffect(()=>{
    if(token !== null){
      setLogin(true)
    }
  }, [token])

  return (

    <div className="App">
      <TokenContext.Provider
        value = {{token, setToken}}
      >
      <NavHeader switchLocale={switchLocale}/>
      <BrowserRouter basename="/">
        <Switch>
          <Route path="/" component={LandingPage} exact/>
          <Route path="/about" component={About} exact/>
          {login && <Route path="/todo" component={Todo} exact/>}
          {login && <Route path="/todo/:id" component={Detail} exact/>}
          {!login && <Route path="/regist" component={RegisterPage} exact/>}
          <Route render={() => <Redirect to={{pathname: "/"}} />} />
          
        </Switch>
      </BrowserRouter>
      </TokenContext.Provider>
    </div>

  );
}

