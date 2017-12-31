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
import { Input, TeaNavigator, NavigationBar, BasePage, Toast } from 'teaset';
var width = Dimensions.get('window').width;
export default class Comment extends BasePage {
  static defaultProps = {
    scene: TeaNavigator.SceneConfigs.PushFromRight,
  };
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      comment: '',
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
          rightView={<TouchableOpacity onPress={() => {
            let uri = ip + ':8080/routepoint/' + this.props.id + '/sendComment';
            fetch(uri, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                comment: this.state.comment,
                score: this.state.score
              }),
              credentials: 'include'
            })
              .then((response) => response.json())
              .then((res) => {
                if (res.status == 1) {
                  fetch(ip + ':8080/account/getUserInfoByTokenInCookie', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                  })
                    .then((response) => response.json())
                    .then((res) => {
                      let oneComment = {
                        userName: res.userName,
                        score: this.state.score,
                        content: this.state.comment
                      }
                      this.props.setComment(oneComment);
                      Toast.success('发表成功');
                      this.navigator.pop();
                    })
                    .done();

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
        <View style={styles.commenttop}>
          <AirbnbRating
            count={5}
            reviews={['太糟了', '失望哦', '很一般', '还成吧', '极好的']}
            defaultRating={0}
            size={35}
            style={{ zIndex: 9999 }}
            onFinishRating={(rating) => this.setState({ score: rating })}
          />
        </View>
        <Input
          style={styles.input}
          onChangeText={text => this.setState({ comment: text })}
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
    marginTop: 64,
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