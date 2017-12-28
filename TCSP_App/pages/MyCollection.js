import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
var width = Dimensions.get('window').width;
import { BasePage, NavigationBar, TeaNavigator, NavigationPage } from 'teaset';
import TravelMain from './TravelMain';
export default class MyCollection extends NavigationPage {
  static defaultProps = {
    scene: TeaNavigator.SceneConfigs.PushFromRight,
  };
  constructor(props) {
    super(props);
    this.state = {
      collectionList: []
    }
  }
  componentWillMount() {
    if (this.props.id == undefined) {
      fetch(ip+':8080/account/my/favoriteRoute', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      })
        .then((response) => response.json())
        .then((res) => {
          this.setState({ collectionList: res });
        })
        .done();
    }
    else {
      let uri = ip+':8080/account/'+this.props.id+'/favoriteRoute';
      fetch(uri, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      })
        .then((response) => response.json())
        .then((res) => {
          this.setState({ collectionList: res });
        })
        .done();
    }
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#eee' }}>
        <NavigationBar
          style={{ backgroundColor: 'rgb(65, 192, 115)', zIndex: 99999 }}
          type='ios'
          tintColor='#fff'
          title='收藏'
          leftView={<NavigationBar.BackButton title='Back'
            onPress={() => this.navigator.pop()
            } />}
        />
        <View style={{ marginTop: 44 }}>
          {
            this.state.collectionList.map((onecollection, index) => {
              return (
                <TouchableOpacity style={styles.onecollection} key={index} activeOpacity={0.9} onPress={() => {
                  this.navigator.push({ view: <TravelMain id={onecollection.id}/> });
                }}>
                  <View style={styles.collectioncontent}>
                    <Image style={{ width: 50, height: 50 }} source={require('../public/images/image1.jpg')} />
                    <View style={{ marginLeft: 15 }}>
                      <Text style={{ fontSize: 18, marginBottom: 5 }}>{onecollection.name}</Text>
                      <Text style={{ fontSize: 12 }}>{onecollection.creatorName}</Text>
                    </View>
                    <Image style={{ width: 24, height: 24, position: 'absolute', top: 23, right: 0 }} source={require('../public/images/right.png')} />
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  collectioncontent: {
    width: width - 20,
    borderColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 70
  },
  onecollection: {
    width: width,
    height: 70,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    elevation: 1
  },
})

module.exports = MyCollection;