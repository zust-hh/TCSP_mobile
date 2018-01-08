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
  Button
} from 'react-native';
import forge from 'node-forge';
import ButtonComponent from 'react-native-button-component';
import TravelMain from './TravelMain';
import { TeaNavigator, BasePage, Toast } from 'teaset';
import RNFetchBlob from 'react-native-fetch-blob'
var { height, width } = Dimensions.get('window');

class TravelList extends BasePage {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.renderHeaderItem = this.renderHeaderItem.bind(this);
    this.renderFooterItem = this.renderFooterItem.bind(this);
    this.state = {
      pointList: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      pointEn: [],
    }
  }
  //进行渲染数据
  static defaultProps = ({
    scene: TeaNavigator.SceneConfigs.PushFromRight,
  });
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
  //渲染头数据
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
  //渲染中间数据
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
  //渲染脚数据
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
  //渲染块内数据
  renderCenterContent(data) {
    return (
      <View style={{ marginLeft: 15, marginTop: 10 }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ color: 'black', fontSize: 14, backgroundColor: '#00000000' }}>{data.pointName}</Text>
          <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 10 }}><Text style={{ color: '#777', fontSize: 12, backgroundColor: '#00000000' }}>{data.pointCity}</Text></View>
        </View>
        <Text style={{ color: '#777', fontSize: 12, marginTop: 10, backgroundColor: '#00000000' }}>{data.pointEn}</Text>
        </View>
    );
  }
  componentWillMount() {
    var pointList = this.props.pointList;
    this.setState({ pointList });
  }
  //完成创建

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.travelhead}>
          <Text style={{ fontSize: 30, color: '#fff', marginTop: 30, marginLeft: 25 }}>{this.props.title}</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: '#f5f5f5', paddingTop: 20 }}>
          {this.renderContent(this.state.dataSource.cloneWithRows(
            this.state.pointList.slice(1, this.state.pointList.length - 1) === undefined ? [] : this.state.pointList.slice(1, this.state.pointList.length - 1)))}
        </View>
        <Button
          onPress={() => this.navigator.pop()}
          title="返回编辑"
          style={styles.goback}
        >
        </Button>
        <Button
          onPress={() => {
            let routepointList = [];
            for (let i = 0; i < this.props.pointList.length; i++) {
              let one = {
                "index": this.props.pointList[i].pointNum,
                "name": this.props.pointList[i].pointName,
                "latitude": this.props.pointList[i].pointLati,
                "longitude": this.props.pointList[i].pointLongi,
              };
              routepointList.push(one);
            }

            let formdata = new FormData();
            let uri = JSON.stringify(this.props.photouri.uri).substring(1, this.props.photouri.uri.length + 1);

            let PATH = uri.replace('file:///', 'file://');// 运行试试  我感觉 不是这个问题。。嗯，没用，我觉得还是地址的问题，你能看下你的请求file是什么样的吗？就是这个图

            let file = { uri: PATH, type: 'image/jpg', name: 'image.jpg' };
            formdata.append('coverPic', file);
            formdata.append('title', this.props.title);
            formdata.append('routepointList', );

            console.log(formdata);
            RNFetchBlob.fetch('POST', ip + ':8080/route/create', {
            }, [
                { name: 'coverPic', filename: 'a.jpg', type: 'image/jpg', data: RNFetchBlob.wrap(PATH) },
                // elements without property `filename` will be sent as plain text
                { name: 'title', data: this.props.title },
                { name: 'routepointList', data: JSON.stringify(routepointList) },
              ]).then((resp) => {
                Toast.success('创建成功');
                this.navigator.push({ view: <TravelMain status={false} id={resp.json().id} /> });
              }).catch((err) => {
                Toast.fail(JSON.stringify(err));
              })
          }
          }
          title="完成创建"
          style={styles.complete}
        >
        </Button>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  travelhead: {
    width: width,
    height: 160,
    backgroundColor: 'rgba(24,150,136,0.8)',
  },
  goback: {
    width: 100,
    position: 'absolute',
    bottom: 20,
    left: 20,
    zIndex: 99999
  },
  complete: {
    width: 100,
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 99999
  }
});
module.exports = TravelList;