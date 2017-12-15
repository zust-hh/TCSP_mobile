import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button
} from 'react-native';
import { TeaNavigator, NavigationPage, NavigationBar } from 'teaset';
// import { StackNavigator } from 'react-navigation';
import Home from './Home';
import Regist from './Regist';
import Login from './Login';
import List from './TestList';
import Admin from './Admin';
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

export default class Router extends NavigationPage {
  static defaultProps = {
    ...NavigationPage.defaultProps,
    title: 'Teaset Example',
  };
  constructor(props) {
    super(props);
    this.state = {
      status: 0,
    }
  }
  componentDidMount() {
    // if(this.state.status == 0) {
    //   this.navigator.push({view: <Home />})
    // }
    // else {
    //   this.navigator.push({view: <Login />})
    // }
  }
  render() {
    return (
      // <View>
      //   <Button onPress={()=>this.navigator.push({view:<Home/>})}
      //   title='132'>

      //   </Button>
      // </View>
      this.state.status == 0 ? <Home /> : <Login />
    );
  }
}
// export default SimpleApp = StackNavigator({
//   Router: { screen: Router },
//   Home: { screen: Home },
//   Regist: { screen: Regist },
//   Login: { screen: Login },
//   List: { screen: List },
//   Admin: { screen: Admin },
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