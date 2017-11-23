import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
export default class Regist extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.regist}>
          <Text style={styles.header}>
            Registration
          </Text>

          <TextInput style={styles.textinput} placeholder="Your name"
            underlineColorAndroid={'transparent'} />

          <TextInput style={styles.textinput} placeholder="Your password"
            underlineColorAndroid={'transparent'} secureTextEntry={true}/>

          <TextInput style={styles.textinput} placeholder="Your email"
            underlineColorAndroid={'transparent'} />

          <TouchableOpacity style={styles.button}>
            <Text style={styles.btntext}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    backgroundColor: "#36485f",
    paddingLeft:60,
    paddingRight:60
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
    alignSelf:'stretch',
    alignItems: 'center',
    padding:20,
    backgroundColor: '#59cbbd',
    marginTop:30,
  },
  btntext: {
    color: '#fff',
    fontWeight:'bold',
  }
})

module.exports = Regist;