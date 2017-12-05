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
import { SegmentedView } from 'teaset';
export default class FindHome extends Component {
  render() {
    return (
      <SegmentedView style={{ flex: 1 }} type='carousel' barStyle={styles.bar} indicatorLineColor={'#fff'} indicatorType={'boxWidth'} indicatorLineWidth={3}>
        <SegmentedView.Sheet title='行程' titleStyle={styles.titletext} activeTitleStyle={styles.titletext}>
          <View style={{ flex: 1, alignItems: 'center', padding: 10 }}>
            <ScrollView>
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
              <TouchableOpacity style={styles.oneuser} activeOpacity={1}>
                <Image style={{ width: 48, height: 48, borderRadius: 24, marginRight: 15 }} source={require('../public/images/image2.jpg')} />
                <View style={{ position: 'relative',flex:1,justifyContent:'center'}}>
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={{ fontSize: 18, marginBottom: 5 }}>Zust_lxz</Text>
                    <Text style={{  fontSize: 12 }}>follow：1234</Text>
                  </View>
                  <View style={{ position: 'absolute', right: 30}}>
                    <TouchableOpacity>
                      <Image  style={{ width: 24, height: 24}} source={require('../public/images/notconcerned.png')} />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.oneuser} activeOpacity={1}>
                <Image style={{ width: 48, height: 48, borderRadius: 24, marginRight: 15 }} source={require('../public/images/image1.jpg')} />
                <View style={{ position: 'relative',flex:1,justifyContent:'center'}}>
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={{ fontSize: 18, marginBottom: 5 }}>Zust_lxz</Text>
                    <Text style={{  fontSize: 12 }}>follow：1234</Text>
                  </View>
                  <View style={{ position: 'absolute', right: 30}}>
                    <TouchableOpacity>
                      <Image  style={{ width: 24, height: 24}} source={require('../public/images/notconcerned.png')} />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.oneuser} activeOpacity={1}>
                <Image style={{ width: 48, height: 48, borderRadius: 24, marginRight: 15 }} source={require('../public/images/image3.jpg')} />
                <View style={{ position: 'relative',flex:1,justifyContent:'center'}}>
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={{ fontSize: 18, marginBottom: 5 }}>Zust_lxz</Text>
                    <Text style={{  fontSize: 12 }}>follow：1234</Text>
                  </View>
                  <View style={{ position: 'absolute', right: 30}}>
                    <TouchableOpacity>
                      <Image  style={{ width: 24, height: 24}} source={require('../public/images/notconcerned.png')} />
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
    backgroundColor: rgb(65, 192, 115),
  },
  titletext: {
    fontSize: 20,
    color: '#FFFFFF',
  },
  onetravel: {
    marginBottom: 10,
    position: 'relative',
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