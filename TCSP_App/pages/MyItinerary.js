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
import TravelMain from './TravelMain';
var width = Dimensions.get('window').width;
export default class MyItinerary extends BasePage {
  static defaultProps = {
    scene: TeaNavigator.SceneConfigs.PushFromRight,
  };
  constructor(props) {
    super(props);
    this.state = {
      itineraryList: []
    }
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#eee' }}>
        <NavigationBar
          style={{ backgroundColor: 'rgb(65, 192, 115)' }}
          type='ios'
          tintColor='#fff'
          title='发布的行程'
          leftView={<NavigationBar.BackButton title='Back'
            onPress={() => this.navigator.pop()
            } />}
        />
        <View style={{ marginTop: 44 }}>
          {/* {
          this.state.itineraryList.map((oneitinerary, index) => {
            return (
              <TouchableOpacity style={styles.oneitinerary} activeOpacity={0.9} onPress={() => {
                this.navigator.push({ view: <TravelMain /> });
              }}>
                <View style={styles.itinerarycontent}>
                  <Image style={{ width: 50, height: 50 }} source={require('../public/images/image1.jpg')} />
                  <View style={{ marginLeft: 15 }}>
                    <Text style={{ fontSize: 18, marginBottom: 5 }}>上海的美食之旅</Text>
                    <Text style={{ fontSize: 12 }}>发布日期：2017/12/06</Text>
                  </View>
                  <Image style={{ width: 24, height: 24, position: 'absolute', top: 23, right: 0 }} source={require('../public/images/right.png')} />
                </View>
              </TouchableOpacity>
            )
          })
        } */}
          <TouchableOpacity style={styles.oneitinerary} activeOpacity={0.9}>
            <View style={styles.itinerarycontent}>
              <Image style={{ width: 50, height: 50 }} source={require('../public/images/image1.jpg')} />
              <View style={{ marginLeft: 15 }}>
                <Text style={{ fontSize: 18, marginBottom: 5 }}>上海的美食之旅</Text>
                <Text style={{ fontSize: 12 }}>发布日期：2017/12/06</Text>
              </View>
              <Image style={{ width: 24, height: 24, position: 'absolute', top: 23, right: 0 }} source={require('../public/images/right.png')} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.oneitinerary} activeOpacity={0.9}>
            <View style={styles.itinerarycontent}>
              <Image style={{ width: 50, height: 50 }} source={require('../public/images/image2.jpg')} />
              <View style={{ marginLeft: 15 }}>
                <Text style={{ fontSize: 18, marginBottom: 5 }}>上海的美食之旅</Text>
                <Text style={{ fontSize: 12 }}>发布日期：2017/12/06</Text>
              </View>
              <Image style={{ width: 24, height: 24, position: 'absolute', top: 23, right: 0 }} source={require('../public/images/right.png')} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.oneitinerary} activeOpacity={0.9}>
            <View style={styles.itinerarycontent}>
              <Image style={{ width: 50, height: 50 }} source={require('../public/images/image3.jpg')} />
              <View style={{ marginLeft: 15 }}>
                <Text style={{ fontSize: 18, marginBottom: 5 }}>上海的美食之旅</Text>
                <Text style={{ fontSize: 12 }}>发布日期：2017/12/06</Text>
              </View>
              <Image style={{ width: 24, height: 24, position: 'absolute', top: 23, right: 0 }} source={require('../public/images/right.png')} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itinerarycontent: {
    width: width - 20,
    borderColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 70
  },
  oneitinerary: {
    width: width,
    height: 70,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    elevation: 1
  },
})

module.exports = MyItinerary;