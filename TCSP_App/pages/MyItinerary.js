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
export default class MyItinerary extends Component {
  static navigationOptions = {
    headerTitle: '发布的行程',
    headerStyle: { elevation: 0, backgroundColor: 'rgb(65, 192, 115)' },
    headerBackTitleStyle: { color: '#FFFFFF' },
    headerTintColor: '#fff',
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
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