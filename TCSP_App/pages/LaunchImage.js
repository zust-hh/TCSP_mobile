import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from './Home';
import Regist from './Regist';
import Login from './Login';
import List from './TestList';
import Admin from './Admin';
import TravelMain from './TravelMain';
import TravelMap from './TravelMap';
import UserHome from './UserHome';
class LaunchImage extends Component {
  static navigationOptions = {
    title: 'Launch',    //设置navigator的title
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button
          onPress={ () => navigate('UserHome')}
          title="Chat with Lucy"
        />
      </View>
    );
  }
}
export default SimpleApp = StackNavigator({
  LaunchImage: { screen: LaunchImage },
  Home: { screen: Home },
  Regist: { screen: Regist },
  Login: { screen: Login },
  List: { screen: List },
  Admin: { screen: Admin },
  TravelMain: { screen: TravelMain },
  TravelMap: { screen: TravelMap },
  UserHome: { screen: UserHome },
});