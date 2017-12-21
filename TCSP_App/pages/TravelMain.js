import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ListView,
  ImageBackground,
} from 'react-native';
import forge from 'node-forge';
import ButtonComponent from 'react-native-button-component';
import Admin from './Admin';
import { TeaNavigator, BasePage, NavigationBar } from 'teaset';
import TravelMap from './TravelMap';
var { height, width } = Dimensions.get('window');
export default class TravelMain extends BasePage {
  static defaultProps = ({
    scene: TeaNavigator.SceneConfigs.PushFromRight,
  });
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.renderHeaderItem = this.renderHeaderItem.bind(this);
    this.renderFooterItem = this.renderFooterItem.bind(this);
    this.state = {
      travelName: '',
      pointList: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      pointEn: [],
      status: false,
    }
  }
  componentWillMount() {
    let uri = 'http://192.168.1.113:8080/route/' + this.props.id + '/info';
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
        this.setState({ pointList: res.routepointList });
      })
      .done();
    if (this.props.status) {
      this.setState({ status: true },()=> {
        this.state.status;
      });
    }

  }
  //进行渲染数据
  renderContent(dataSource) {
    return (
      <ListView
        initialListSize={1}
        dataSource={dataSource}
        renderRow={this.renderItem}
        style={{ flex: 1 }}
        onEndReachedThreshold={10}
        enableEmptySections={true}
        renderHeader={this.renderHeaderItem}
        renderFooter={this.renderFooterItem}
      />
    );
  }
  //渲染每一项的数据
  renderItem(data) {
    if (data.pointNum > 1 && data.pointNum < this.state.pointList.length + 1) {
      return (this.renderCenterItem(data));
    }
  }
  renderHeaderItem() {
    return (
      <View style={{ flexDirection: 'row', height: 75 }}>
        <View>
          <Image source={require('../public/images/beginpoint.png')}
            style={{ width: 30, height: 30, marginLeft: 10, marginTop: 22 }} />
          <Image source={require('../public/images/ic_order_shu.png')} style={{ height: 20, marginLeft: 25, flex: 1 }} />
        </View>
        <View >
          <View style={{ height: 5 }} />
          <ImageBackground source={require('../public/images/ic_order_status_item_bg.png')}
            style={{ height: 65, marginLeft: 10, width: (width - 60) }}>
            {this.renderCenterContent(this.state.pointList[0])}
          </ImageBackground>
          <View style={{ height: 5 }} />
        </View>
      </View>
    );
  }
  renderCenterItem(data) {
    return (
      <View style={{ flexDirection: 'row', height: 75 }}>
        <View>
          <Image source={require('../public/images/ic_order_shu.png')} style={{ height: 20, marginLeft: 25, flex: 1 }} />
          <Image source={require('../public/images/centerpoint.png')} style={{ width: 30, height: 30, marginLeft: 10 }} />
          <Image source={require('../public/images/ic_order_shu.png')} style={{ height: 20, marginLeft: 25, flex: 1 }} />
        </View>
        <View >
          <View style={{ height: 5 }} />
          <ImageBackground source={require('../public/images/ic_order_status_item_bg.png')}
            style={{ height: 65, marginLeft: 10, width: (width - 60) }}>
            {this.renderCenterContent(data)}
          </ImageBackground>
          <View style={{ height: 5 }} />
        </View>
      </View>
    );
  }
  renderFooterItem() {
    if (this.state.pointList.length > 1) {
      return (
        <View style={{ flexDirection: 'row', height: 75 }}>
          <View>
            <Image source={require('../public/images/ic_order_shu.png')} style={{ height: 20, marginLeft: 25 }} />
            <Image source={require('../public/images/endpoint.png')} style={{ width: 30, height: 30, marginLeft: 10 }} />
          </View>
          <View >
            <View style={{ height: 5 }} />
            <ImageBackground source={require('../public/images/ic_order_status_item_bg.png')}
              style={{ height: 65, marginLeft: 10, width: (width - 60) }}>
              {this.renderCenterContent(this.state.pointList[this.state.pointList.length - 1])}
            </ImageBackground>
            <View style={{ height: 5 }} />
          </View>
        </View>
      );
    }
    else return null;
  }
  renderCenterContent(data) {
    let md = forge.md.md5.create();
    let md5 = '20171204000102168' + data.pointName + '1435660288' + 'e7lsCMhXMlCsuflPXkrO';
    md5 = encodeURI(md5);
    md.update(md5);
    let sign = md.digest().toHex();
    // alert(sign);
    let trauri = "http://api.fanyi.baidu.com/api/trans/vip/translate?q=" + encodeURI(data.pointName) + "from=zh&to=en&appid=20171204000102168&salt=1435660288&sign=" + sign;
    fetch(trauri)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          console.error('服务器繁忙，请稍后再试；\r\nCode:' + response.status)
        }
      })
      .then((data1) => {
        let pointEn = JSON.stringify(data1);
        // alert(pointEn);
        // this.setState({ pointEn }, () => {
        //   alert(this.state.pointEn);
        // })
      })
      .catch((err) => {
        console.error(err)
      });
    return (
      <View style={{ marginLeft: 15, marginTop: 10 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: 'black', fontSize: 14, backgroundColor: '#00000000' }}>{data.name}</Text>
          <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 10 }}><Text style={{ color: '#777', fontSize: 12, backgroundColor: '#00000000' }}>{data.longitude}</Text></View>
        </View>
        <Text style={{ color: '#777', fontSize: 12, marginTop: 10, backgroundColor: '#00000000' }}>this.</Text>
      </View>
    );
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavigationBar
          style={{ backgroundColor: 'rgb(65, 192, 115)' }}
          type='ios'
          tintColor='#fff'
          title={this.state.travelName}
          leftView={
            this.state.status ?
              <NavigationBar.BackButton title='Back'
                onPress={() => this.navigator.pop()
                } /> :
              <NavigationBar.BackButton title='Back'
                onPress={() => this.navigator.push({ view: <Admin /> })
                } />}
          rightView={
            <TouchableOpacity style={styles.menubtn} onPress={() => this.navigator.push({ view: <TravelMap pointList={this.state.pointList} /> })}>
              <Image source={require('../public/images/map.png')} style={{ width: 27, height: 27 }} />
            </TouchableOpacity>
          }
        />
        <View style={styles.travelhead}>
          <Image source={require('../public/images/image2.jpg')} style={{ width: width, height: 160 }} />
        </View>
        <View style={{ flex: 1, backgroundColor: '#f5f5f5', paddingTop: 20 }}>
          {this.renderContent(this.state.dataSource.cloneWithRows(
            this.state.pointList.slice(1, this.state.pointList.length - 1) === undefined ? [] : this.state.pointList.slice(1, this.state.pointList.length - 1)))}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  menubtn: {
    marginRight: 10,
    zIndex: 9999,
    borderRadius: 0,
  },
  travelhead: {
    width: width,
    height: 160,
    marginTop: 44
  },
  complete: {
    width: 100,
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 99999
  }
});
