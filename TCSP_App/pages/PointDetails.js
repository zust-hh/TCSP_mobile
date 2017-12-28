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
import { Button, TeaNavigator, BasePage, NavigationBar } from 'teaset';
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
    }
  }
  componentDidMount() {
    alert('123');
    let uri = ip+':8080/routepoint/' + this.props.id;
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
        this.setState({ onePoint: res });
      })
      .done();
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <NavigationBar
          style={{ backgroundColor: 'rgb(65, 192, 115)' }}
          type='ios'
          tintColor='#fff'
          title='添加行程'
          leftView={<NavigationBar.BackButton title='Back'
            onPress={() => this.navigator.pop()
            } />}
        />
        <Image source={require('../public/images/image2.jpg')} style={styles.headimage} />
        <View style={styles.feel}>
          <View style={styles.feelhead}>
            <Image source={require('../public/images/feelicon.png')} style={styles.feelheadicon} />
            <Text style={{ fontWeight: 'bold' }}>游记分享</Text>
            {
              this.props.creatorId == this.props.userId ? <Button type='danger' title='修改感想' onPress={() => this.navigator.push({ view: <Feel id={this.props.id} /> })} style={{ position: 'absolute', height: 20, right: 10 }} /> : null
            }
          </View>
          <View style={styles.feelcontent}>
            <Text>       {this.state.onePoint.feel}</Text>
          </View>
        </View>
        <View style={styles.pointmap}>
          <Image source={{ uri: 'http://restapi.amap.com/v3/staticmap?key=a12fe0a773225a0edbb395bce289a441&scale=2&zoom=14&markers=mid,,A:' + this.state.onePoint.longitude + ',' + this.state.onePoint.latitude + '&location=' + this.state.onePoint.longitude + ',' + this.state.onePoint.latitude + '&size=' + width + '*120' }} style={{ width: width, height: 120 }} />
        </View>
        <TouchableOpacity style={styles.addcomment} activeOpacity={0.9} onPress={() => this.navigator.push({ view: <Comment id={this.props.id} /> })}>
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
                this.state.onePoint.commentList.map((onecomment, index) => {
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

// export default SimpleApp = StackNavigator({
//   LaunchImage: { screen: LaunchImage },
//   Comment: { screen: Comment },
//   Feel: { screen: Feel },
// });