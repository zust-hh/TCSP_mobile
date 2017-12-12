import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Linking
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from './Home';
import Regist from './Regist';
import Login from './Login';
import List from './TestList';
import Admin from './Admin';
import TravelMain from './TravelMain';
class LaunchImage extends Component {
  static navigationOptions = {
    title: 'Launch',    //设置navigator的title
  }
  constructor(props) {
    super(props);
    this.state = {
      url: 'androidamap://route?sid=BGVIS1&slat=39.98871&slon=116.43234&sname=对外经贸大学&did=BGVIS2&dlat=40.055878&dlon=116.307854&dname=北京&dev=0&m=0&t=2',
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Button
          onPress={() => {
            Linking.canOpenURL(this.state.url).then(supported => {
              if (supported) {
                Linking.openURL(this.state.url);
              } else {
                console.log('无法打开该URI: ' + this.props.url);
              }
            })
          }}
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
});