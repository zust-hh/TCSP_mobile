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
import { TeaNavigator, NavigationBar, BasePage, Toast } from 'teaset';
var width = Dimensions.get('window').width;
export default class Feel extends BasePage {
  static defaultProps = {
    scene: TeaNavigator.SceneConfigs.PushFromRight,
  };
  constructor(props) {
    super(props);
    this.state = {
      content: '',
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
          rightView={<TouchableOpacity onPress={() => {
            let uri = ip+':8080/routepoint/' + this.props.id + '/feel/save';
            fetch(uri, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                content: this.state.content
              }),
              credentials: 'include'
            })
              .then((response) => response.json())
              .then((res) => {
                if (res.status == 1) {
                  Toast.success('发表成功');
                  this.navigator.pop();
                }
                else {
                  console.error(res.message);
                }
              })
              .done();
          }} activeOpacity={0.7} >
            <Image source={require('../public/images/send.png')} style={{ width: 25, height: 25, marginRight: 15 }} />
          </TouchableOpacity>}
        />
        <TextInput
          style={styles.input}
          onChangeText={text => this.setState({ content: text })}
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
    marginTop: 54,
    width: 200,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 16,
    width: width - 20,
  },
})

module.exports = Feel;