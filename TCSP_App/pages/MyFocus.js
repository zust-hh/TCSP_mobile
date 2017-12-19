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
  componentWillMount() {
    if (this.props.id == undefined) {
      fetch('http://192.168.1.113:8080/account/my/concernList', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      })
        .then((response) => response.json())
        .then((res) => {
          this.setState({ focusList: res });
        })
        .done();
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
        <View style={{ marginTop: 44, elevation: 1, backgroundColor: '#FFFFFF', }}>
          {
            this.state.focusList.map((onefocus, index) => {
              return (
                <View style={styles.onefocus} key={index}>
                  <TouchableOpacity style={styles.onefocusleft} activeOpacity={0.9} onPress={() => {
                    this.navigator.push({ view: <OtherUserHome /> });
                  }}>
                    <View style={styles.focuscontent}>
                      <Image style={{ width: 50, height: 50 }} source={require('../public/images/boy.png')} />
                      <View style={{ marginLeft: 15 }}>
                        <Text style={{ fontSize: 18, marginBottom: 5 }}>{onefocus.userName}</Text>
                        <Text style={{ fontSize: 12 }}>follow:{onefocus.concernNum}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ zIndex: 9999, height: 70, width: 35 }} onPress={() => {
                    let uri = 'http://192.168.1.113:8080/concern/remove/' + onefocus.id;
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

                      })
                      .done();
                  }}>
                    <Image style={{ width: 35, height: 35, position: 'absolute', top: 17.5, right: 0 }} source={require('../public/images/unsubscribe.png')} />
                  </TouchableOpacity>
                </View>
              )
            })
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  focuscontent: {
    width: width - 70,
    borderColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 70
  },
  onefocus: {
    width: width,
    height: 70,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
  },
  onefocusleft: {
    width: width - 50,
    height: 70,
    alignItems: 'center',
  }
})

module.exports = MyFocus;