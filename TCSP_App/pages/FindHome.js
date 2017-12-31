import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SegmentedView, TeaNavigator, BasePage, Toast } from 'teaset';
import OtherUserHome from './OtherUserHome';
import TravelMain from './TravelMain';
export default class FindHome extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      findRouterList: [],
      findPeopleList: [],
      pointEn: [],
    }
  }
  static defaultProps = {
    scene: TeaNavigator.SceneConfigs.PushFromRight,
  };
  fetchfc() {
    fetch(ip + ':8080/route/suggest/latitude/39.91095/longitude/116.37296/radius/30', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
      .then((response1) => response1.json())
      .then((res1) => {
        this.setState({ findRouterList: res1 });
      })
      .done();
    fetch(ip + ':8080/suggestion/bigVList', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
      .then((response) => response.json())
      .then((res) => {
        this.setState({ findPeopleList: res });
      })
      .done();
  }
  componentDidMount() {
    this.fetchfc();
  }
  render() {
    return (
      <SegmentedView style={{ flex: 1, backgroundColor: '#eee' }} type='carousel' barStyle={styles.bar} indicatorLineColor={'#fff'} indicatorType={'boxWidth'} indicatorLineWidth={3}>
        <SegmentedView.Sheet title='行程' titleStyle={styles.titletext} activeTitleStyle={styles.titletext}>
          <View style={{ flex: 1, alignItems: 'center', padding: 10 }}>
            <ScrollView>
              {
                this.state.findRouterList.map((onefind, index) => {
                  let cover = ip + ':8080/uploads/cover/' + onefind.coverPic;
                  return (
                    <TouchableOpacity style={styles.onetravel} key={index} activeOpacity={0.9} onPress={() => { this.navigator.push({ view: <TravelMain status={1} id={onefind.id} /> }) }}>
                      <Image style={{ width: Dimensions.get('window').width - 20, height: 210, borderRadius: 5 }} source={{ uri: cover }} />
                      <View style={styles.oneinfo}>
                        <View style={{ flexDirection: 'column' }}>
                          <Text style={{ color: '#fff', fontSize: 24, marginBottom: 5 }}>{onefind.name}</Text>
                          {/* <Text style={{ color: '#fff', marginLeft: 5, fontSize: 12 }}>{english}</Text> */}
                        </View>
                        <View style={{ position: 'absolute', right: 20, top: 20 }}>
                          <Text style={{ color: '#fff', fontSize: 16 }}>{onefind.creatorName}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollView>
          </View>
        </SegmentedView.Sheet>
        <SegmentedView.Sheet title='大咖' titleStyle={styles.titletext} activeTitleStyle={styles.titletext}>
          <View style={{ flex: 1, alignItems: 'center', padding: 10, backgroundColor: '#fff' }}>
            <ScrollView>
              {
                this.state.findPeopleList.map((oneuser, index) => {
                  return (
                    <TouchableOpacity style={styles.oneuser} key={index} activeOpacity={1} onPress={() => { this.navigator.push({ view: <OtherUserHome id={oneuser.id} /> }) }}>
                      <Image style={{ width: 48, height: 48, borderRadius: 24, marginRight: 15 }} source={require('../public/images/boy.png')} />
                      <View style={{ position: 'relative', flex: 1, justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'column' }}>
                          <Text style={{ fontSize: 18, marginBottom: 5 }}>{oneuser.userName}</Text>
                          <Text style={{ fontSize: 12 }}>follow:{oneuser.concernNum}</Text>
                        </View>
                        <View style={{ position: 'absolute', right: 30 }}>
                          <TouchableOpacity onPress={() => {
                            let uri = ip + ':8080/concern/add/' + oneuser.id;
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
                                  Toast.success('关注成功！');
                                  fetch(ip + ':8080/suggestion/bigVList', {
                                    method: 'POST',
                                    headers: {
                                      'Accept': 'application/json',
                                      'Content-Type': 'application/json',
                                    },
                                    credentials: 'include'
                                  })
                                    .then((response) => response.json())
                                    .then((res) => {
                                      this.setState({ findPeopleList: res });
                                    })
                                    .done();
                                }
                                else {
                                }
                              })
                              .done();
                          }}>
                            <Image style={{ width: 24, height: 24 }} source={require('../public/images/notconcerned.png')} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollView>
          </View>
        </SegmentedView.Sheet>
      </SegmentedView>
    );
  }
}

const styles = StyleSheet.create({
  bar: {
    height: 60,
    backgroundColor: 'rgb(65, 192, 115)',
  },
  titletext: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  onetravel: {
    marginBottom: 10,
    position: 'relative',
    elevation: 2,
  },
  oneinfo: {
    padding: 10,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width - 20,
    height: 70,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    elevation: 2
  },
  oneuser: {
    backgroundColor: '#FFFFFF',
    width: Dimensions.get('window').width,
    height: 60,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
  }
});
module.exports = FindHome;