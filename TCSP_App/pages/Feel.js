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
import { TeaNavigator, NavigationBar, BasePage } from 'teaset';
var width = Dimensions.get('window').width;
export default class Feel extends Component {
  static defaultProps = {
    scene: TeaNavigator.SceneConfigs.PushFromRight,
  };
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <View style={styles.container}>
        <NavigationBar
          style={{ backgroundColor: 'rgb(65, 192, 115)' }}
          type='ios'
          tintColor='#fff'
          title='修改感想'
          leftView={<NavigationBar.BackButton title='Back'
            onPress={() => this.navigator.pop()
            } />}
          rightView={<TouchableOpacity onPress={() => { }} activeOpacity={0.7} >
            <Image source={require('../public/images/send.png')} style={{ width: 25, height: 25, marginRight: 15 }} />
          </TouchableOpacity>}
        />
        <TextInput
          style={styles.input}
          // onChangeText={text => this.setState({ valueCustom: text })}
          placeholder="把你的感想分享一下吧"
          placeholderTextColor='rgb(200,200,200)'
          autoFocus={true}
          multiline={true}
          underlineColorAndroid={'transparent'}
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
    fontSize: 16,
    width: width - 20,
  },
})

module.exports = Feel;