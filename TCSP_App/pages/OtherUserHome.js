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
// import { StackNavigator } from 'react-navigation';
import MyCollection from './MyCollection';
import MyFocus from './MyFocus';
import MyItinerary from './MyItinerary';
import { BasePage, NavigationBar, TeaNavigator } from 'teaset';
var width = Dimensions.get('window').width;
export default class OtherUserHome extends BasePage {
  static defaultProps = {
    scene: TeaNavigator.SceneConfigs.PushFromRight,
  };
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      userid: '',
    }
  }
  componentWillMount() {
    let uri = 'http://192.168.1.113:8080/account/' + this.props.id + '/basicInfo';
    fetch(uri, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((res) => {
        this.setState({ username: res.userName });
        this.setState({ userid: res.id });
      })
      .done();
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#eee' }}>
        <NavigationBar
          style={{ backgroundColor: 'rgb(65, 192, 115)' }}
          type='ios'
          tintColor='#fff'
          title={this.state.userName + '的个人空间'}
          leftView={<NavigationBar.BackButton title='Back'
            onPress={() => this.navigator.pop()
            } />}
        />
        <View style={styles.userhead}>
          <Image style={{ width: width, height: 198, position: 'absolute', top: 0, left: 0 }} source={require('../public/images/userheadimg.jpg')} />
          <View style={styles.userinfo}>
            <Image style={{ width: 70, height: 70, borderRadius: 35 }} source={require('../public/images/boy.png')} />
            <Text style={{ fontSize: 18, color: '#fff', marginTop: 25, fontWeight: 'bold' }}>
              {this.state.username}
            </Text>
          </View>
        </View>
        <View style={styles.usercontent}>
          <TouchableOpacity style={styles.onecontent} activeOpacity={0.5} onPress={() => this.navigator.push({ view: <MyCollection id={userid} /> })}>
            <Image style={{ width: 40, height: 40, marginBottom: 10 }} source={require('../public/images/mysc.png')} />
            <Text>Ta的收藏</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.onecontent} activeOpacity={0.5} onPress={() => this.navigator.push({ view: <MyFocus id={userid} /> })}>
            <Image style={{ width: 40, height: 40, marginBottom: 10 }} source={require('../public/images/mygz.png')} />
            <Text>Ta的关注</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.onecontent} activeOpacity={0.5} onPress={() => this.navigator.push({ view: <MyItinerary id={userid} /> })}>
            <Image style={{ width: 40, height: 40, marginBottom: 10 }} source={require('../public/images/myxc.png')} />
            <Text>Ta的行程</Text>
          </TouchableOpacity>
        </View>
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

// export default SimpleApp = StackNavigator({
//   OtherUserHome: { screen: OtherUserHome },
//   MyCollection: { screen: MyCollection },
//   MyFocus: { screen: MyFocus },
//   MyItinerary: { screen: MyItinerary },
// });
