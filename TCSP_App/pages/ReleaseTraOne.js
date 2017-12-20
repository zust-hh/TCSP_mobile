import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  PixelRatio,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import { Input, TeaNavigator, BasePage, NavigationBar } from 'teaset';
import ImagePicker from 'react-native-image-picker';
import ReleaseTraTwo from './ReleaseTraTwo';
export default class ReleaseTraOne extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      valueCustom: '',
      startPoint: '',
      photouri: null,
    }
  }
  static defaultProps = {
    scene: TeaNavigator.SceneConfigs.PushFromRight,
  };
  gototwo = () => {
    if (this.state.valueCustom != '' && this.state.startPoint != '' && this.state.photouri != null) {
      this.navigator.push({ view: <ReleaseTraTwo title={this.state.valueCustom} start={this.state.startPoint} photouri={this.state.photouri}/> })
    }
    else {
      alert('请先填写信息');
    }
  }
  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          photouri: source
        });
      }
    });
  }
  render() {
    return (
      <View style={styles.note}>
        <NavigationBar
          style={{ backgroundColor: 'rgb(65, 192, 115)' }}
          type='ios'
          tintColor='#fff'
          title='添加行程'
          leftView={<NavigationBar.BackButton title='Back'
            onPress={() => this.navigator.pop()
            } />}
        />
        <Input
          style={styles.input}
          onChangeText={text => this.setState({ valueCustom: text })}
          placeholder="行程标题"
          placeholderTextColor='rgb(200,200,200)'
        />
        <TouchableOpacity style={styles.upload} activeOpcity={0.9} onPress={this.selectPhotoTapped.bind(this)}>
          {this.state.photouri === null ? <Image style={{ width: 60, height: 60, marginBottom: 25, marginTop: 45 }} source={require('../public/images/imgupload.png')} /> :
            <Image style={{ width: 150, height: 150,  borderRadius: 15 }} source={this.state.photouri} />
          }
          <Text style={{ fontSize: 12 }}>封面图片</Text>
        </TouchableOpacity>
        <Input
          style={styles.input}
          onChangeText={text => this.setState({ startPoint: text })}
          placeholder="行程起点城市"
          placeholderTextColor='rgb(200,200,200)'
        />
        <TouchableHighlight
          onPress={this.gototwo}
          style={styles.gototwo} activeOpacity={0.7} underlayColor='rgb(53,122,232)'>
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
    marginTop: 80,
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