import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
var width = Dimensions.get('window').width;
export default class MyFocus extends Component {
  static navigationOptions = {
    headerTitle: '我的关注',
    headerStyle: { elevation: 0, backgroundColor: 'rgb(65, 192, 115)' },
    headerBackTitleStyle: { color: '#FFFFFF' },
    headerTintColor: '#fff',
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={styles.onefocus} activeOpacity={0.9}>
          <View style={styles.focuscontent}>
            <Image style={{ width: 50, height: 50 }} source={require('../public/images/boy.png')} />
            <View style={{ marginLeft: 15 }}>
              <Text style={{ fontSize: 18, marginBottom: 5 }}>Zust_lxz</Text>
              <Text style={{ fontSize: 12 }}>follows:1344</Text>
            </View>
            <Image style={{ width: 35, height: 35, position: 'absolute', top: 17.5, right: 0 }} source={require('../public/images/unsubscribe.png')} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.onefocus} activeOpacity={0.9}>
          <View style={styles.focuscontent}>
            <Image style={{ width: 50, height: 50 }} source={require('../public/images/boy.png')} />
            <View style={{ marginLeft: 15 }}>
              <Text style={{ fontSize: 18, marginBottom: 5 }}>Zust_lxz</Text>
              <Text style={{ fontSize: 12 }}>follows:1344</Text>
            </View>
            <Image style={{ width: 35, height: 35, position: 'absolute', top: 17.5, right: 0 }} source={require('../public/images/unsubscribe.png')} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.onefocus} activeOpacity={0.9}>
          <View style={styles.focuscontent}>
            <Image style={{ width: 50, height: 50 }} source={require('../public/images/boy.png')} />
            <View style={{ marginLeft: 15 }}>
              <Text style={{ fontSize: 18, marginBottom: 5 }}>Zust_lxz</Text>
              <Text style={{ fontSize: 12 }}>follows:1344</Text>
            </View>
            <Image style={{ width: 35, height: 35, position: 'absolute', top: 17.5, right: 0 }} source={require('../public/images/unsubscribe.png')} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  focuscontent: {
    width: width - 20,
    borderColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 70
  },
  onefocus: {
    width: width,
    height: 70,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    elevation: 1
  },
})

module.exports = MyFocus;