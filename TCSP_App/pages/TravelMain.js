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
  AsyncStorage,
} from 'react-native';
import forge from 'node-forge';
import ButtonComponent from 'react-native-button-component';
import Icon from 'react-native-vector-icons/Ionicons';
import Admin from './Admin';
import ActionButton from 'react-native-action-button';
import { TeaNavigator, BasePage, NavigationBar, Toast } from 'teaset';
import TravelMap from './TravelMap';
import PointDetails from './PointDetails';
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
      userId: 0,
      creatorId: 0,
      travelName: '',
      pointList: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      pointEn: [],
      status: false,
      collect: 0,
      collectName: ['收藏', '取消收藏'],
      pointCity: [],
      // coverPic: ip+':8080/uploads/cover/1514633175596.jpg',
      coverPic: '',
    }
  }
  componentDidMount() {
    let uri = ip + ':8080/route/' + this.props.id + '/info';
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
        this.setState({ creatorId: res.creatorId });
        this.setState({ travelName: res.name });
        this.setState({ coverPic: ip+':8080/uploads/cover/'+res.coverPic });
        this.setState({ pointList: res.routepointList }, () => {
          for (let i = 0; i < res.routepointList.length; i++) {
            let md6 = '2015063000000001' + String(res.routepointList[i].name) + '143566028812345678';
            var sign = md5(md6);
            let trauri = "http://api.fanyi.baidu.com/api/trans/vip/translate?q=" + encodeURI(String(res.routepointList[i].name)) + "&from=zh&to=en&appid=2015063000000001&salt=1435660288&sign=" + sign;
            fetch(trauri)
              .then((response) => {
                if (response.ok) {
                  return response.json()
                } else {
                  console.error('服务器繁忙，请稍后再试；\r\nCode:' + response.status)
                }
              })
              .then((data1) => {
                let onePointEn = data1.trans_result[0].dst;
                let pointEn = this.state.pointEn;
                pointEn.push(onePointEn);
                this.setState({ pointEn });
              })
              .catch((err) => {
                console.error(err)
              });
            let geouri = 'http://restapi.amap.com/v3/geocode/geo?key=a12fe0a773225a0edbb395bce289a441&address=' + res.routepointList[i].name;
            fetch(geouri)
              .then((response) => {
                if (response.ok) {
                  return response.json()
                } else {
                  console.error('服务器繁忙，请稍后再试；\r\nCode:' + response.status)
                }
              })
              .then((data) => {
                if (data.count == 0 || data.status == 0) {
                  this.setState({ err: 1 });
                }
                else {
                  let onePointCity = data.geocodes[0].city;
                  let pointCity = this.state.pointCity;
                  pointCity.push(onePointCity);
                  this.setState({ pointCity });
                }
              })
              .catch((err) => {
                console.error(err)
              });
          }
        });
        AsyncStorage.getItem('userId')
          .then(userId => {
            if (userId != null) {
              this.setState({ userId })
            }
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .done();
    if (this.props.status) {
      this.setState({ status: true });
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
    if (data.index > 1 && data.index < this.state.pointList.length + 1) {
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
    if (data == undefined) return null;
    else {
      return (
        <TouchableOpacity style={{ marginLeft: 15, marginTop: 10 }} activeOpacity={0.8} onPress={() => this.navigator.push({ view: <PointDetails id={data.id} creatorId={this.state.creatorId} userId={this.state.userId} /> })}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'black', fontSize: 14, backgroundColor: '#00000000' }}>{data.name}</Text>
            <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 10 }}><Text style={{ color: '#777', fontSize: 12, backgroundColor: '#00000000' }}>{this.state.pointCity[data.index - 1]}</Text></View>
          </View>
          <Text style={{ color: '#777', fontSize: 12, marginTop: 10, backgroundColor: '#00000000' }}>{this.state.pointEn[data.index - 1]}</Text>
        </TouchableOpacity>
      );
    }
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
              <NavigationBar.BackButton title='完成'
                onPress={() => this.navigator.push({ view: <Admin /> })
                } />}
          rightView={
            <TouchableOpacity style={styles.menubtn} onPress={() => this.navigator.push({ view: <TravelMap pointList={this.state.pointList} /> })}>
              <Image source={require('../public/images/map.png')} style={{ width: 27, height: 27 }} />
            </TouchableOpacity>
          }
        />
        <View style={styles.travelhead}>
          <Image source={{uri: this.state.coverPic}} style={{ width: width, height: 160 }} />
        </View>
        <View style={{ flex: 1, backgroundColor: '#f5f5f5', paddingTop: 20 }}>
          {this.renderContent(this.state.dataSource.cloneWithRows(
            this.state.pointList.slice(1, this.state.pointList.length - 1) === undefined ? [] : this.state.pointList.slice(1, this.state.pointList.length - 1)))}
        </View>
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="分享" onPress={() => console.log("notes tapped!")}>
            <Icon name="md-create" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title={this.state.collectName[this.state.collect]} onPress={() => {
            if (this.state.collect == 0) {
              let uri = ip + ':8080/route/' + this.props.id + '/addToFavorites';
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
                  if (res.status == 1) {
                    this.setState({ collect: 1 });
                    Toast.success('收藏成功');
                  }
                })
                .done();
            }
            else if (this.state.collect == 1) {
              let uri = ip + ':8080/route/' + this.props.id + '/removeFromFavorites';
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
                  if (res.status == 1) {
                    this.setState({ collect: 0 });
                    Toast.success('取消收藏成功');
                  }
                })
                .done();
            }
          }}>
            <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
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
  },
  actionButtonIcon: {
    width: 15,
    height: 15,
    color: '#FFFFFF',
  }
});
