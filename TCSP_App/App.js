// App.js

'use strict';

import React, {Component} from 'react';

import {TeaNavigator} from 'teaset';
import Home from './pages/Home';
import Login from './pages/Login';
import Regist from './pages/Regist';
import Admin from './pages/Admin';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      status: 0,
    }
  }
  render() {
    return (
      this.state.status == 0 ? <TeaNavigator rootView={<Admin />} /> : <TeaNavigator rootView={<Login />} />
    );
  }
}