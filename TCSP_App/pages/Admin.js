import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {Button,TabView} from 'teaset';
import Login from './Login';
import Rigist from './Regist';
import Home from './Home';
export default class Admin extends Component {
  static navigationOptions = {
    header: false,
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <TabView style={{ flex: 1 }} type='projector'>
        <TabView.Sheet
          title='首页'
          icon={require('../public/images/home.png')}
          activeIcon={require('../public/images/home_active.png')}
        >
          <Home />
        </TabView.Sheet>
        <TabView.Sheet
          title='发现'
          icon={require('../public/images/chart.png')}
          activeIcon={require('../public/images/chart_active.png')}
        >
          <Login />
        </TabView.Sheet>
        <TabView.Sheet
          title='我的'
          icon={require('../public/images/me.png')}
          activeIcon={require('../public/images/me_active.png')}
          badge={1}
        >
          <Rigist />
        </TabView.Sheet>
      </TabView>
    );
  }

}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  detail_text: {
    fontSize: 16,
    margin: 10
  },
  back_text: {
    width: 80,
    backgroundColor: 'gray',
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 20
  }
});
