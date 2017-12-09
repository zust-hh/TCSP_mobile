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
var width = Dimensions.get('window').width;
export default class LauchImage extends Component {
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
          userName: '',
          content: '好地方',
          time: '',
          score: 3,
        }, {
          userName: '',
          content: '好地方',
          time: '',
          score: 4,
        }, {
          userName: '',
          content: '好地方',
          time: '',
          score: 5,
        }
        ]
      },
    }
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <Image source={require('../public/images/image2.jpg')} style={styles.headimage} />
        <View style={styles.feel}>
          <View style={styles.feelhead}>
            <Image source={require('../public/images/feelicon.png')} style={styles.feelheadicon} />
            <Text style={{ fontWeight: 'bold' }}>游记分享</Text>

          </View>
          <View style={styles.feelcontent}>
            <Text>       {this.state.onePoint.feel}</Text>
          </View>
        </View>
        <View style={styles.pointmap}>
          <Image source={{ uri: 'http://restapi.amap.com/v3/staticmap?key=a12fe0a773225a0edbb395bce289a441&scale=2&zoom=14&markers=mid,,A:' + this.state.onePoint.longitude + ',' + this.state.onePoint.latitude + '&location=' + this.state.onePoint.longitude + ',' + this.state.onePoint.latitude + '&size=' + width + '*120' }} style={{ width: width, height: 120 }} />
        </View>
        <TouchableOpacity style={styles.addcomment} activeOpacity={0.9} onPress={() => alert(1)}>
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
              <Image source={require('../public/images/boy.png')} style={{width:45,height:45}}/>
              <View style={styles.onecommentright}>
                <View style={styles.onecommentrighthead}>
                  <Text>Zust_lxz</Text>
                  <View>
                    <Text>很一般</Text>
                  </View>
                </View>
                <View>
                  <Text>这里真是个好地方！！！</Text>
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
  feelcontent: {

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
  },
  onecommentrighthead: {
    flexDirection: 'row',
  }
})

module.exports = LauchImage;