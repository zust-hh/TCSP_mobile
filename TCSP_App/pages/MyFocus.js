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
import { BasePage, NavigationBar, TeaNavigator } from 'teaset';
import OtherUserHome from './OtherUserHome';
var width = Dimensions.get('window').width;
export default class MyFocus extends BasePage {
  static defaultProps = {
    scene: TeaNavigator.SceneConfigs.PushFromRight,
  };
  constructor(props) {
    super(props);
    this.state = {
      focusList: []
    }
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#eee' }}>
        <NavigationBar
          style={{ backgroundColor: 'rgb(65, 192, 115)' }}
          type='ios'
          tintColor='#fff'
          title='关注'
          leftView={<NavigationBar.BackButton title='Back'
            onPress={() => this.navigator.pop()
            } />}
        />
        <View style={{ marginTop: 44 }}>
          {/* {
          this.state.focusList.map((onefocus, index) => {
            return (
              <TouchableOpacity style={styles.onefocus} activeOpacity={0.9} onPress={() => {
                this.navigator.push({ view: <OtherUserHome /> });
              }}>
                <View style={styles.focuscontent}>
                  <Image style={{ width: 50, height: 50 }} source={require('../public/images/boy.png')} />
                  <View style={{ marginLeft: 15 }}>
                    <Text style={{ fontSize: 18, marginBottom: 5 }}>Zust_lxz</Text>
                    <Text style={{ fontSize: 12 }}>follows:1344</Text>
                  </View>
                  <Image style={{ width: 35, height: 35, position: 'absolute', top: 17.5, right: 0 }} source={require('../public/images/unsubscribe.png')} />
                </View>
              </TouchableOpacity>
            )
          })
        } */}
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