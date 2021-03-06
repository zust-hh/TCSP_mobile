import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import MyCollection from './MyCollection';
import MyFocus from './MyFocus';
import MyItinerary from './MyItinerary';
import OtherUserHome from './OtherUserHome';
var width = Dimensions.get('window').width;
class UserHome extends Component {
  static navigationOptions = {
    header: false,
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.userhead}>
          <Image style={{ width: width, height: 198, position: 'absolute', top: 0, left: 0 }} source={require('../public/images/userheadimg.jpg')} />
          <View style={styles.userinfo}>
            <Image style={{ width: 70, height: 70, borderRadius: 35 }} source={require('../public/images/boy.png')} />
            <Text style={{ fontSize: 18, color: '#fff', marginTop: 25, fontWeight: 'bold' }}>
              Zust_lxz
            </Text>
          </View>
        </View>
        <View style={styles.usercontent}>
          <TouchableOpacity style={styles.onecontent} activeOpacity={0.5} onPress={() => this.props.navigation.navigate('MyCollection')}>
            <Image style={{ width: 40, height: 40, marginBottom: 10 }} source={require('../public/images/mysc.png')} />
            <Text>我的收藏</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.onecontent} activeOpacity={0.5} onPress={() => this.props.navigation.navigate('MyFocus')}>
            <Image style={{ width: 40, height: 40, marginBottom: 10 }} source={require('../public/images/mygz.png')} />
            <Text>我的关注</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.onecontent} activeOpacity={0.5} onPress={() => this.props.navigation.navigate('MyItinerary')}>
            <Image style={{ width: 40, height: 40, marginBottom: 10 }} source={require('../public/images/myxc.png')} />
            <Text>我的行程</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.exit} activeOpacity={0.5}>
          <Text style={{ color: 'red', fontSize: 16 }}>退出登录</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userhead: {
    width: width,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  usercontent: {
    marginTop: 10,
    width: width,
    height: 100,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    elevation: 2,
  },
  onecontent: {
    width: width / 3,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exit: {
    backgroundColor: '#fff',
    position: 'absolute',
    width: width,
    bottom: 0,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default SimpleApp = StackNavigator({
  UserHome: { screen: UserHome },
  MyCollection: { screen: MyCollection },
  MyFocus: { screen: MyFocus },
  MyItinerary: { screen: MyItinerary },
  OtherUserHome: { screen: OtherUserHome },
});
