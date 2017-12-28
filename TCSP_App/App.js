// App.js

'use strict';

import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { TeaNavigator } from 'teaset';
import Home from './pages/Home';
import Login from './pages/Login';
import Regist from './pages/Regist';
import Admin from './pages/Admin';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 0,
    }
  }
  aaa = () => {
    // AsyncStorage.removeItem('loginState');
    // AsyncStorage.setItem('loginState','123');
    AsyncStorage.getItem('loginState')
      .then(loginState => {
        if (loginState == null) {
          this.setState({ status: 2 })
        }
        if (loginState != null) {
          this.setState({ status: 1 })
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  bbb = async () => {
    await this.aaa();
  }

  componentWillMount() {
    this.bbb();
  }
  render() {
    if (this.state.status == 0) {
      return null;
    }
    if (this.state.status == 1) {
      return <TeaNavigator rootView={<Admin />} />
    }
    else if (this.state.status == 2) {
      return <TeaNavigator rootView={<Login />} />
    }
    // AsyncStorage.getItem('loginState')
    //   .then(login => JSON.parse(login))
    //   .then(loginState => {
    //     if (loginState == null) {
    //       x = 2
    //     }
    //   })
    //   .catch((err) => {
    //     console.err(err);
    //   });
    // if (x == 1) {
    //   return <TeaNavigator rootView={<Admin />} />
    // }
    // else if (x == 2) {
    //   return <TeaNavigator rootView={<Login />} />
    // }

    // if (JSON.stringify(storage.cache.loginState) == undefined) {
    //   return <TeaNavigator rootView={<Admin />} />
    // }
    // else {
    //   return <TeaNavigator rootView={<Login />} />
    // }
    // return (
    //   this.state.status == 1 ? <TeaNavigator rootView={<Admin />} /> : 
    // );
  }
}