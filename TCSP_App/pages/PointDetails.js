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
  ScrollView,
  StatusBar,
  Linking
} from 'react-native';
import { Button, TeaNavigator, BasePage, NavigationBar, Select, SegmentedView } from 'teaset';
import Comment from './Comment';
import Feel from "./Feel";
var width = Dimensions.get('window').width;
export default class PointDetails extends BasePage {
  static defaultProps = {
    scene: TeaNavigator.SceneConfigs.PushFromRight,
  };
  constructor(props) {
    super(props);
    this.state = {
      scoreName: ['太糟了', '失望哦', '很一般', '还成吧', '极好的'],
      onePoint: {
      },
      feel: '',
      commentList: [],
      foodList: [],
      stayList: [],
      funList: [],
      foodImg: [require('../public/images/food1.png'), require('../public/images/food2.png'), require('../public/images/food3.png'), require('../public/images/food4.png'), require('../public/images/food5.png')],
      stayImg: [require('../public/images/stay1.png'), require('../public/images/stay2.png'), require('../public/images/stay3.png'), require('../public/images/stay4.png'), require('../public/images/stay5.png')],
      funImg: [require('../public/images/fun1.png'), require('../public/images/fun2.png'), require('../public/images/fun3.png'), require('../public/images/fun4.png'), require('../public/images/fun5.png')],
    }
  }
  componentDidMount() {
    let uri = ip + ':8080/routepoint/' + this.props.id;
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
        this.setState({ feel: res.feel });
        this.setState({ commentList: res.commentList });
        this.setState({ onePoint: res });
        let uri1 = 'http://restapi.amap.com/v3/place/around?key=a12fe0a773225a0edbb395bce289a441&location=' + res.longitude + ',' + res.latitude + '&output=json&radius=1000&keywords=美食';
        fetch(uri1)
          .then((response) => response.json())
          .then((res) => {
            let foodList = [];
            if (res.count >= 5) {
              foodList = res.pois.slice(0, 5);
              this.setState({ foodList });
            }
            else {
              foodList = res.pois.slice(0, res.count);
              this.setState({ foodList });
            }
          })
          .done();
        let uri2 = 'http://restapi.amap.com/v3/place/around?key=a12fe0a773225a0edbb395bce289a441&location=' + res.longitude + ',' + res.latitude + '&output=json&radius=1000&keywords=住宿';
        fetch(uri2)
          .then((response) => response.json())
          .then((res) => {
            let stayList = [];
            if (res.count >= 5) {
              stayList = res.pois.slice(0, 5);
              this.setState({ stayList });
            }
            else {
              stayList = res.pois.slice(0, res.count);
              this.setState({ stayList });
            }
          })
          .done();
        let uri3 = 'http://restapi.amap.com/v3/place/around?key=a12fe0a773225a0edbb395bce289a441&location=' + res.longitude + ',' + res.latitude + '&output=json&radius=1000&keywords=娱乐';
        fetch(uri3)
          .then((response) => response.json())
          .then((res) => {
            let funList = [];
            if (res.count >= 5) {
              funList = res.pois.slice(0, 5);
              this.setState({ funList });
            }
            else {
              funList = res.pois.slice(0, res.count);
              this.setState({ funList });
            }
          })
          .done();
      })
      .done();
  }
  setFell(feel) {
    let uri = ip + ':8080/routepoint/' + this.props.id;
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
        this.setState({ feel: res.feel });
        this.setState({ commentList: res.commentList });
        this.setState({ onePoint: res });
      })
      .done();
  }
  setComment(oneComment) {
    let uri = ip + ':8080/routepoint/' + this.props.id;
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
        this.setState({ feel: res.feel });
        this.setState({ commentList: res.commentList });
        this.setState({ onePoint: res });
      })
      .done();
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <Image source={require('../public/images/image2.jpg')} style={styles.headimage} />
          <View style={styles.feel}>
            <View style={styles.feelhead}>
              <Image source={require('../public/images/feelicon.png')} style={styles.feelheadicon} />
              <Text style={{ fontWeight: 'bold' }}>游记分享</Text>
              {
                this.props.creatorId == this.props.userId ? <Button type='danger' title='修改感想' onPress={() => this.navigator.push({
                  view: <Feel id={this.props.id} feel={this.state.feel} setFeel={
                    (feel) => this.setFell(feel)
                  } />
                })} style={{ position: 'absolute', height: 20, right: 10 }} /> : null
              }
            </View>
            <View style={styles.feelcontent}>
              <Text>       {this.state.feel}</Text>
            </View>
          </View>
          <View style={styles.pointmap}>
            <Image source={{ uri: 'http://restapi.amap.com/v3/staticmap?key=a12fe0a773225a0edbb395bce289a441&scale=2&zoom=14&markers=mid,,A:' + this.state.onePoint.longitude + ',' + this.state.onePoint.latitude + '&location=' + this.state.onePoint.longitude + ',' + this.state.onePoint.latitude + '&size=' + width + '*120' }} style={{ width: width, height: 120 }} />
          </View>
          <View style={{ width: width, height: 180, marginTop: 8 }}>
            <SegmentedView style={{ flex: 1 }} type='projector' indicatorType='boxWidth'>
              <SegmentedView.Sheet title='美食'>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={{ backgroundColor: '#fff', padding: 9 }}>
                  {
                    this.state.foodList.map((item, index) => {
                      let Array = item.location.split(',');
                      let url = 'androidamap://route?did=BGVIS2&dlat=' + parseFloat(Array[1]) + '&dlon=' + parseFloat(Array[0]) + '&dname=' + item.name + '&dev=0&m=0&t=2';
                      let name;
                      let address;
                      if (item.name.length > 7) {
                        name = item.name.substr(0, 6);
                        name = name + '...';
                      }
                      else {
                        name = item.name;
                      }
                      if (item.address.length > 10) {
                        address = item.address.substr(0, 9);
                        address = address + '...';
                      }
                      else {
                        address = item.address;
                      }
                      return (
                        <TouchableOpacity key={index} style={{ height: 160, width: width / 3 - 3, flexDirection: 'column', alignItems: 'center' }} onPress={() => {
                          Linking.canOpenURL(url).then(supported => {
                            if (supported) {
                              Linking.openURL(url);
                            } else {
                              console.log('无法打开该URI: ' + this.props.url);
                            }
                          })
                        }}>
                          <Image source={this.state.foodImg[index]} style={{ width: width / 3 - 13, height: width / 3 - 33 }} />
                          <Text style={{ fontWeight: 'bold' }}>{name}</Text>
                          <Text style={{ fontSize: 10 }}>{address}</Text>
                        </TouchableOpacity>
                      )
                    }
                    )}
                </ScrollView>
              </SegmentedView.Sheet>
              <SegmentedView.Sheet title='住宿'>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={{ backgroundColor: '#fff', padding: 9 }}>
                  {
                    this.state.stayList.map((item, index) => {
                      let Array = item.location.split(',');
                      let url = 'androidamap://route?did=BGVIS2&dlat=' + parseFloat(Array[1]) + '&dlon=' + parseFloat(Array[0]) + '&dname=' + item.name + '&dev=0&m=0&t=2';
                      let name;
                      let address;
                      if (item.name.length > 7) {
                        name = item.name.substr(0, 6);
                        name = name + '...';
                      }
                      else {
                        name = item.name;
                      }
                      if (item.address.length > 10) {
                        address = item.address.substr(0, 9);
                        address = address + '...';
                      }
                      else {
                        address = item.address;
                      }
                      return (
                        <TouchableOpacity key={index} style={{ height: 160, width: width / 3 - 3, flexDirection: 'column', alignItems: 'center' }} onPress={() => {
                          Linking.canOpenURL(url).then(supported => {
                            if (supported) {
                              Linking.openURL(url);
                            } else {
                              console.log('无法打开该URI: ' + this.props.url);
                            }
                          })
                        }}>
                          <Image source={this.state.stayImg[index]} style={{ width: width / 3 - 13, height: width / 3 - 33 }} />
                          <Text style={{ fontWeight: 'bold' }}>{name}</Text>
                          <Text style={{ fontSize: 10 }}>{address}</Text>
                        </TouchableOpacity>
                      )
                    }
                    )}
                </ScrollView>
              </SegmentedView.Sheet>
              <SegmentedView.Sheet title='玩乐'>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={{ backgroundColor: '#fff', padding: 9 }}>
                  {
                    this.state.funList.map((item, index) => {
                      let Array = item.location.split(',');
                      let url = 'androidamap://route?did=BGVIS2&dlat=' + parseFloat(Array[1]) + '&dlon=' + parseFloat(Array[0]) + '&dname=' + item.name + '&dev=0&m=0&t=2';
                      let name;
                      let address;
                      if (item.name.length > 7) {
                        name = item.name.substr(0, 6);
                        name = name + '...';
                      }
                      else {
                        name = item.name;
                      }
                      if (item.address.length > 10) {
                        address = item.address.substr(0, 9);
                        address = address + '...';
                      }
                      else {
                        address = item.address;
                      }
                      return (
                        <TouchableOpacity key={index} style={{ height: 160, width: width / 3 - 3, flexDirection: 'column', alignItems: 'center' }} onPress={() => {
                          Linking.canOpenURL(url).then(supported => {
                            if (supported) {
                              Linking.openURL(url);
                            } else {
                              console.log('无法打开该URI: ' + this.props.url);
                            }
                          })
                        }}>
                          <Image source={this.state.funImg[index]} style={{ width: width / 3 - 13, height: width / 3 - 33 }} />
                          <Text style={{ fontWeight: 'bold' }}>{name}</Text>
                          <Text style={{ fontSize: 10 }}>{address}</Text>
                        </TouchableOpacity>
                      )
                    }
                    )}
                </ScrollView>
              </SegmentedView.Sheet>
            </SegmentedView>
          </View>
          <TouchableOpacity style={styles.addcomment} activeOpacity={0.9} onPress={() => this.navigator.push({ view: <Comment id={this.props.id} setComment={(oneComment) => this.setComment(oneComment)} /> })}>
            <Image source={require('../public/images/nullstar.png')} style={{ width: 240, height: 60 }} />
            <Text style={{ color: 'rgb(168,168,168)' }}>点击添加评论</Text>
          </TouchableOpacity>
          <View style={styles.commentmain}>
            <View style={styles.commenthead}>
              <Image source={require('../public/images/commenticon.png')} style={styles.commenticon} />
              <Text style={{ fontWeight: 'bold' }}>{this.state.onePoint.score}评分  {this.state.onePoint.commentNum}评论</Text>
            </View>
            <View style={styles.commentlist}>
              {
                this.state.onePoint.commentList == undefined ? null : this.state.onePoint.commentList == [] ? null :
                  this.state.commentList.map((onecomment, index) => {
                    return (
                      <View style={styles.onecomment} key={index}>
                        <Image source={require('../public/images/boy.png')} style={{ width: 40, height: 40 }} />
                        <View style={styles.onecommentright}>
                          <View style={styles.onecommentrighthead}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{onecomment.userName}</Text>
                            <View style={{ position: 'absolute', right: 0, width: 40, height: 20, backgroundColor: 'rgb(238,238,238)', alignItems: 'center', justifyContent: 'center' }}>
                              <Text style={{ fontSize: 12, color: 'rgb(65,192,116)' }}>{this.state.scoreName[onecomment.score - 1]}</Text>
                            </View>
                          </View>
                          <View>
                            <Text style={{ color: 'rgb(125,125,125)' }}>{onecomment.content}</Text>
                          </View>
                        </View>
                      </View>
                    )
                  })
              }
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(238,238,238)',
  },
  headimage: {
    width: width,
    height: 180,
  },
  feel: {
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  feelhead: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',

  },
  feelheadicon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  commenticon: {
    width: 19,
    height: 17,
    marginRight: 10,
  },
  pointmap: {
    height: 120,
    marginTop: 8,
    backgroundColor: '#FFFFFF',
  },
  addcomment: {
    marginTop: 8,
    width: width,
    height: 90,
    backgroundColor: '#FFFFFF',
    alignItems: 'center'
  },
  commentmain: {
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  commenthead: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  commentlist: {
    backgroundColor: '#FFFFFF',
    marginTop: 8,
  },
  onecomment: {
    flexDirection: 'row',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingBottom: 5
  },
  onecommentright: {
    marginLeft: 10,
    padding: 5,
  },
  onecommentrighthead: {
    width: width - 100,
    flexDirection: 'row',
    marginBottom: 5
  }
});

// export default SimpleApp = StackNavigator({
//   LaunchImage: { screen: LaunchImage },
//   Comment: { screen: Comment },
//   Feel: { screen: Feel },
// });