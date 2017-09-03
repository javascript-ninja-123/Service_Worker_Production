import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import ServiceWorkerDev from './serviceWorkerDev';

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import APP from './App';
import HEADER from './Header';
import TECH from './pages/tech';
import GAME from './pages/game';

ReactDOM.render(
  <Provider>
    <BrowserRouter>
      <div>
        <HEADER/>
        <Switch>
        <Route path='/game' component={GAME}/>
        <Route path='/tech' component={TECH}/>
        <Route path='/' component={APP}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
ServiceWorkerDev();
//add registerServiceWorker.js later
