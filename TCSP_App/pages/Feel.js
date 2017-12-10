import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Input } from 'teaset';
var width = Dimensions.get('window').width;
export default class Feel extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '小和山风景区感想',
    // title: `${navigation.state.params.start}`,
    headerRight: <TouchableOpacity onPress={() => { }} activeOpacity={0.7} >
      <Image source={require('../public/images/send.png')} style={{ width: 25, height: 25, marginRight: 15 }} />
    </TouchableOpacity>,
    headerStyle: { elevation: 0, backgroundColor: 'rgb(65, 192, 116)' },
    headerBackTitleStyle: { color: '#FFFFFF' },
    headerTintColor: '#fff',
  });
  render() {
    return (
      <View style={styles.container}>
        <Input
          style={styles.input}
          onChangeText={text => this.setState({ valueCustom: text })}
          placeholder="把你的感想分享一下吧"
          placeholderTextColor='rgb(200,200,200)'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  input: {
    marginTop: 10,
    width: 200,
    backgroundColor: 'white',
    color: 'black',
    borderColor: '#fff',
    fontSize: 16,
  },
})

module.exports = Feel;