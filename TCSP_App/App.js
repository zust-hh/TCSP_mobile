// App.js

'use strict';

import React, { Component } from 'react';

import { TeaNavigator } from 'teaset';
import Home from './pages/Home';
import Login from './pages/Login';
import Regist from './pages/Regist';
import Admin from './pages/Admin';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 1,
    }
  }
  aaa = (params) => {
    return new Promise((resolve, reject) => {
      fetch('http://192.168.1.113:8080/account/loginByToken', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else {
            resolve(2);
            return false;
          }
        })
        .then((data) => {
          if (data) {

          } else {
            if (data.status == 1) {
              resolve(1)
            } else {
              resolve(2)
            }
          }
        })
        .catch((err) => {
          console.error(err)
        });
    })
  }
  bbb = async () => {
    let a = await this.aaa();
    this.setState({ status: a }, () => {

    })
  }

  componentWillMount() {
    this.bbb();
  }
  render() {
    return (
      this.state.status == 0 ? null : this.state.status == 1 ? <TeaNavigator rootView={<Admin />} /> : <TeaNavigator rootView={<Login />} />
    );
  }
}