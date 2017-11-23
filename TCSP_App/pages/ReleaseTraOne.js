import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import { Input } from 'teaset';
export default class ReleaseTraOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valueCustom: '行程标题',
      startPoint: '北京'
    }
  }
  static navigationOptions = {
    title: '发布行程',    //设置navigator的title
    elevation: 0
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.note}>
        <Input
          style={styles.input}
          onChangeText={text => this.setState({ valueCustom: text })}
          placeholder="行程标题"
          placeholderTextColor='rgb(200,200,200)'
        />
        <View style={styles.upload}>
          <Image style={{ width: 60, height: 60,marginBottom:25,marginTop:45 }} source={require('../public/images/imgupload.png')} />
          <Text style={{fontSize:12}}>封面图片</Text>
        </View>
        <Input
          style={styles.input}
          onChangeText={text => this.setState({ startPoint: text })}
          placeholder="行程起点城市"
          placeholderTextColor='rgb(200,200,200)'
        />
        <TouchableHighlight onPress={() => navigate('ReleaseTraTwo',{title:this.state.valueCustom,start:this.state.startPoint})} style={styles.gototwo} activeOpacity={0.7} underlayColor='rgb(53,122,232)'>
          <Text>开始编辑</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  note: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
  },
  input: {
    marginTop: 50,
    width: 200,
    backgroundColor: 'white',
    color: 'black'
  },
  upload: {
    alignItems: 'center',
    width: 150,
    height: 150,
    flexDirection: 'column',
    backgroundColor: 'rgb(226,226,226)',
    marginTop: 50,
    borderRadius: 15
  },
  gototwo: {
    marginTop: 70,
    backgroundColor: '#18B4FF',
    width: 120,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
});