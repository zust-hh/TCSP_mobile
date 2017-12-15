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
import { Input, TeaNavigator, NavigationBar, BasePage } from 'teaset';
var width = Dimensions.get('window').width;
export default class Comment extends BasePage {
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
          title='评论'
          leftView={<NavigationBar.BackButton title='Back'
            onPress={() => this.navigator.pop()
            } />}
          rightView={<TouchableOpacity onPress={() => { }} activeOpacity={0.7} >
            <Image source={require('../public/images/send.png')} style={{ width: 25, height: 25, marginRight: 15 }} />
          </TouchableOpacity>}
        />
        <View style={styles.commenttop}>
          <AirbnbRating
            count={5}
            reviews={['太糟了', '失望哦', '很一般', '还成吧', '极好的']}
            defaultRating={0}
            size={35}
          // onFinishRating={(rating)=>alert("Rating is: " + rating)}
          />
        </View>
        <Input
          style={styles.input}
          onChangeText={text => this.setState({ valueCustom: text })}
          placeholder="点评一下吧"
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
  commenttop: {
    marginTop: 20,
    paddingBottom: 15,
    borderColor: '#eee',
    borderBottomWidth: 1,
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

module.exports = Comment;