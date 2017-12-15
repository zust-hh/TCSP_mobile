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
import { SegmentedView, TeaNavigator, BasePage } from 'teaset';
import OtherUserHome from './OtherUserHome';
import TravelMain from './TravelMain';
export default class FindHome extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      findRouterList: [],
      findPeopleList: [],
    }
  }
  static defaultProps = {
    scene: TeaNavigator.SceneConfigs.PushFromRight,
  };
  render() {
    return (
      <SegmentedView style={{ flex: 1, backgroundColor: '#eee' }} type='carousel' barStyle={styles.bar} indicatorLineColor={'#fff'} indicatorType={'boxWidth'} indicatorLineWidth={3}>
        <SegmentedView.Sheet title='行程' titleStyle={styles.titletext} activeTitleStyle={styles.titletext}>
          <View style={{ flex: 1, alignItems: 'center', padding: 10 }}>
            <ScrollView>
              {/* {
                this.findRouterList.map((onefind,index) => {
                  return (
                    <TouchableOpacity style={styles.onetravel} activeOpacity={0.9} onPress={()=>{this.navigator.push({view: <TravelMain />})}}>
                    <Image style={{ width: Dimensions.get('window').width - 20, height: 210, borderRadius: 5 }} source={require('../public/images/image1.jpg')} />
                    <View style={styles.oneinfo}>
                      <View style={{ flexDirection: 'column' }}>
                        <Text style={{ color: '#fff', fontSize: 24, marginBottom: 5 }}>上海的美食之旅</Text>
                        <Text style={{ color: '#fff', marginLeft: 5, fontSize: 12 }}>出发地：上海市</Text>
                      </View>
                      <View style={{ position: 'absolute', right: 20, top: 20 }}>
                        <Text style={{ color: '#fff', fontSize: 16 }}>Zust_lxz</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  )
                })
              } */}
              <TouchableOpacity style={styles.onetravel} activeOpacity={0.9}>
                <Image style={{ width: Dimensions.get('window').width - 20, height: 210, borderRadius: 5 }} source={require('../public/images/image1.jpg')} />
                <View style={styles.oneinfo}>
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={{ color: '#fff', fontSize: 24, marginBottom: 5 }}>上海的美食之旅</Text>
                    <Text style={{ color: '#fff', marginLeft: 5, fontSize: 12 }}>出发地：上海市</Text>
                  </View>
                  <View style={{ position: 'absolute', right: 20, top: 20 }}>
                    <Text style={{ color: '#fff', fontSize: 16 }}>Zust_lxz</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.onetravel} activeOpacity={0.9}>
                <Image style={{ width: Dimensions.get('window').width - 20, height: 210, borderRadius: 5 }} source={require('../public/images/image2.jpg')} />
                <View style={styles.oneinfo}>
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={{ color: '#fff', fontSize: 24, marginBottom: 5 }}>北京的美食之旅</Text>
                    <Text style={{ color: '#fff', marginLeft: 5, fontSize: 12 }}>出发地：北京市</Text>
                  </View>
                  <View style={{ position: 'absolute', right: 20, top: 20 }}>
                    <Text style={{ color: '#fff', fontSize: 16 }}>Zust_lxz</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.onetravel} activeOpacity={0.9}>
                <Image style={{ width: Dimensions.get('window').width - 20, height: 210, borderRadius: 5 }} source={require('../public/images/image3.jpg')} />
                <View style={styles.oneinfo}>
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={{ color: '#fff', fontSize: 24, marginBottom: 5 }}>杭州的美食之旅</Text>
                    <Text style={{ color: '#fff', marginLeft: 5, fontSize: 12 }}>出发地：杭州市</Text>
                  </View>
                  <View style={{ position: 'absolute', right: 20, top: 20 }}>
                    <Text style={{ color: '#fff', fontSize: 16 }}>Zust_lxz</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </SegmentedView.Sheet>
        <SegmentedView.Sheet title='大咖' titleStyle={styles.titletext} activeTitleStyle={styles.titletext}>
          <View style={{ flex: 1, alignItems: 'center', padding: 10, backgroundColor: '#fff' }}>
            <ScrollView>
              {/* {
                this.state.findPeopleList.map((oneuser, index) => {
                  return (
                    <TouchableOpacity style={styles.oneuser} activeOpacity={1} onPress={()=>{this.navigator.push({view: <OtherUserHome />})}}>
                      <Image style={{ width: 48, height: 48, borderRadius: 24, marginRight: 15 }} source={require('../public/images/image2.jpg')} />
                      <View style={{ position: 'relative', flex: 1, justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'column' }}>
                          <Text style={{ fontSize: 18, marginBottom: 5 }}>Zust_lxz</Text>
                          <Text style={{ fontSize: 12 }}>follow：1234</Text>
                        </View>
                        <View style={{ position: 'absolute', right: 30 }}>
                          <TouchableOpacity>
                            <Image style={{ width: 24, height: 24 }} source={require('../public/images/notconcerned.png')} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                })
              } */}

              <TouchableOpacity style={styles.oneuser} activeOpacity={1}>
                <Image style={{ width: 48, height: 48, borderRadius: 24, marginRight: 15 }} source={require('../public/images/image1.jpg')} />
                <View style={{ position: 'relative', flex: 1, justifyContent: 'center' }}>
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={{ fontSize: 18, marginBottom: 5 }}>Zust_lxz</Text>
                    <Text style={{ fontSize: 12 }}>follow：1234</Text>
                  </View>
                  <View style={{ position: 'absolute', right: 30 }}>
                    <TouchableOpacity>
                      <Image style={{ width: 24, height: 24 }} source={require('../public/images/notconcerned.png')} />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.oneuser} activeOpacity={1}>
                <Image style={{ width: 48, height: 48, borderRadius: 24, marginRight: 15 }} source={require('../public/images/image3.jpg')} />
                <View style={{ position: 'relative', flex: 1, justifyContent: 'center' }}>
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={{ fontSize: 18, marginBottom: 5 }}>Zust_lxz</Text>
                    <Text style={{ fontSize: 12 }}>follow：1234</Text>
                  </View>
                  <View style={{ position: 'absolute', right: 30 }}>
                    <TouchableOpacity>
                      <Image style={{ width: 24, height: 24 }} source={require('../public/images/notconcerned.png')} />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
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