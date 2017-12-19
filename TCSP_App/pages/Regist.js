import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button
} from 'react-native';
import { TeaNavigator, BasePage } from 'teaset';
import Login from './Login';
export default class Regist extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      tel: ''
    }
  }
  static defaultProps = {
    scene: TeaNavigator.SceneConfigs.PushFromRight,
  };
  regist = () => {
    fetch('http://192.168.1.113:8080/account/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: this.state.username,
        password: this.state.password,
        email: this.state.email,
        tel: this.state.tel
      }),
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((res) => {
        if (res.status == 1) {
          this.navigator.pop();
        }
        else {
          alert(res.message);
        }
      })
      .done();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.regist}>
          <Text style={styles.header}>
            Registration
          </Text>

          <TextInput style={styles.textinput} placeholder="Your name"
            onChangeText={(username) => this.setState({ username })}
            underlineColorAndroid={'transparent'} />

          <TextInput style={styles.textinput} placeholder="Your password"
            onChangeText={(password) => this.setState({ password })}
            underlineColorAndroid={'transparent'} secureTextEntry={true} />

          <TextInput style={styles.textinput} placeholder="Your email"
            onChangeText={(email) => this.setState({ email })}
            underlineColorAndroid={'transparent'} />

          <TextInput style={styles.textinput} placeholder="Your telephone"
            onChangeText={(tel) => this.setState({ tel })}
            underlineColorAndroid={'transparent'} />

          <TouchableOpacity style={styles.button} onPress={this.regist}>
            <Text style={styles.btntext}>Sign up</Text>
          </TouchableOpacity>
          <Button title='已有帐号' onPress={() => this.navigator.pop()}/>
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#36485f",
    paddingLeft: 60,
    paddingRight: 60
  },
  regist: {
    alignSelf: 'stretch',
  },
  header: {
    fontSize: 24,
    color: '#fff',
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#199187'
  },
  textinput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 30,
    color: '#fff',
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1,
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#59cbbd',
    marginTop: 30,
  },
  btntext: {
    color: '#fff',
    fontWeight: 'bold',
  }
})

module.exports = Regist;