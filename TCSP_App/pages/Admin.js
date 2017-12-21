import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
// import { StackNavigator } from 'react-navigation';
import { Button, TabView, TeaNavigator, BasePage } from 'teaset';
import Home from './Home';
import FindHome from './FindHome';
import UserHome from './UserHome';
export default class Admin extends BasePage {
  static defaultProps = {
    scene: TeaNavigator.SceneConfigs.PushFromRight,
  };
  render() {
    return (
      <TabView style={{ flex: 1 }} type='projector' onChange={(index) => {
        index == 1 && this.refs.find && this.refs.find.fetchfc();
        }}>
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
          <FindHome ref='find' />
        </TabView.Sheet>
        <TabView.Sheet
          title='我的'
          icon={require('../public/images/me.png')}
          activeIcon={require('../public/images/me_active.png')}
        >
          <UserHome />
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