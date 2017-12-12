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
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button } from 'teaset';
import Comment from './Comment';
import Feel from "./Feel";
var width = Dimensions.get('window').width;
class PointDetails extends Component {
  static navigationOptions = {
    header: false,
  }
  constructor(props) {
    super(props);
    this.state = {
      scoreName: ['太糟了', '失望哦', '很一般', '还成吧', '极好的'],
      onePoint: {
        name: '小和山风景区',
        longitude: 120.3,
        latitude: 30.2,
        feel: '山清水秀，是个旅游的好地方山清水秀，是个旅游的好地方山清水秀，是个旅游的好地方山清水秀，是个旅游的好地方山清水秀，是个旅游的好地方山清水秀，是个旅游的好地方山清水秀，是个旅游的好地方山清水秀，是个旅游的好地方山清水秀，是个旅游的好地方',
        commentNum: 3,
        commentList: [{
          userName: 'Zust_lxz',
          content: '好地方',
          time: '13465',
          score: 3,
        }, {
          userName: 'Zust_lxz',
          content: '好地方',
          time: '132165',
          score: 4,
        }, {
          userName: 'Zust_lxz',
          content: '好地方',
          time: '13213',
          score: 5,
        }
        ]
      },
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <Image source={require('../public/images/image2.jpg')} style={styles.headimage} />
        <View style={styles.feel}>
          <View style={styles.feelhead}>
            <Image source={require('../public/images/feelicon.png')} style={styles.feelheadicon} />
            <Text style={{ fontWeight: 'bold' }}>游记分享</Text>
            <Button type='danger' title='修改感想' onPress={() => navigate('Feel')} style={{position:'absolute',height:20,right:10}}/>
          </View>
          <View style={styles.feelcontent}>
            <Text>       {this.state.onePoint.feel}</Text>
          </View>
        </View>
        <View style={styles.pointmap}>
          <Image source={{ uri: 'http://restapi.amap.com/v3/staticmap?key=a12fe0a773225a0edbb395bce289a441&scale=2&zoom=14&markers=mid,,A:' + this.state.onePoint.longitude + ',' + this.state.onePoint.latitude + '&location=' + this.state.onePoint.longitude + ',' + this.state.onePoint.latitude + '&size=' + width + '*120' }} style={{ width: width, height: 120 }} />
        </View>
        <TouchableOpacity style={styles.addcomment} activeOpacity={0.9} onPress={() => navigate('Comment')}>
          <Image source={require('../public/images/nullstar.png')} style={{ width: 240, height: 60 }} />
          <Text style={{ color: 'rgb(168,168,168)' }}>点击添加评论</Text>
        </TouchableOpacity>
        <View style={styles.commentmain}>
          <View style={styles.commenthead}>
            <Image source={require('../public/images/commenticon.png')} style={styles.commenticon} />
            <Text style={{ fontWeight: 'bold' }}>4.32评分  3评论</Text>
          </View>
          <View style={styles.commentlist}>
            <View style={styles.onecomment}>
              <Image source={require('../public/images/boy.png')} style={{ width: 40, height: 40 }} />
              <View style={styles.onecommentright}>
                <View style={styles.onecommentrighthead}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Zust_lxz</Text>
                  <View style={{ position: 'absolute', right: 0, width: 40, height: 20, backgroundColor: 'rgb(238,238,238)', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 12, color: 'rgb(65,192,116)' }}>很一般</Text>
                  </View>
                </View>
                <View>
                  <Text style={{ color: 'rgb(125,125,125)' }}>这里真是个好地方！！！</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
    height: 160,
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

export default SimpleApp = StackNavigator({
  LaunchImage: { screen: LaunchImage },
  Comment: { screen: Comment },
  Feel: { screen: Feel },
});