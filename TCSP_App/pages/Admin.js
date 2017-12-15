import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
// import { StackNavigator } from 'react-navigation';
import {Button,TabView,TeaNavigator, BasePage} from 'teaset';
import Home from './Home';
import List from './TestList';
import Comment from './Comment';
import Feel from './Feel';
import FindHome from './FindHome';
import MyCollection from './MyCollection';
import MyFocus from './MyFocus';
import MyItinerary from './MyItinerary';
import OtherUserHome from './OtherUserHome';
import PointDetails from './PointDetails';
import ReleaseTraOne from './ReleaseTraOne';
import ReleaseTraTwo from './ReleaseTraTwo';
import TravelList from './TravelList';
import TravelMain from './TravelMain';
import TravelMap from './TravelMap';
import UserHome from './UserHome';
export default class Admin extends BasePage {
  // static navigationOptions = {
  //   header: false,
  // }
  static defaultProps = {
    scene: TeaNavigator.SceneConfigs.PushFromRight,
  };
  render() {
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
          <FindHome />
        </TabView.Sheet>
        <TabView.Sheet
          title='我的'
          icon={require('../public/images/me.png')}
          activeIcon={require('../public/images/me_active.png')}
          badge={1}
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
// export default SimpleApp1 = StackNavigator({
//   Admin: { screen: Admin },
//   Home: { screen: Home },
//   List: { screen: List },
//   Comment: { screen: Comment },
//   Feel: { screen: Feel },
//   FindHome: { screen: FindHome },
//   MyCollection: { screen: MyCollection },
//   MyFocus: { screen: MyFocus },
//   MyItinerary: { screen: MyItinerary },
//   OtherUserHome: { screen: OtherUserHome },
//   PointDetails: { screen: PointDetails },
//   ReleaseTraOne: { screen: ReleaseTraOne },
//   ReleaseTraTwo: { screen: ReleaseTraTwo },
//   TravelList: { screen: TravelList },
//   TravelMain: { screen: TravelMain },
//   TravelMap: { screen: TravelMap },
//   UserHome: { screen: UserHome },
// });