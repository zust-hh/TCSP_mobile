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
export default class Comment extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: '小和山风景区',
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