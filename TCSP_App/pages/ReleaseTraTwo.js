import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image
} from 'react-native';
import OneSearch from './components/OneSearch';
import OnePoint from './components/OnePoint';
import { MapView, Marker } from 'react-native-amap3d';
import { SearchInput, Button, Badge, Theme, Label, Drawer, ListRow } from 'teaset';
import ButtonComponent from 'react-native-button-component';
export default class ReleaseTraTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Lati: 39.91095,
      Longi: 116.37296,
      FormatAdd: '',
      FormatCity: '',
      searchText: '',
      searchArray: [],
      listShow: false,
      pointNum: 0,
      pointList: []
    }
  }
  //传递给子搜索的函数
  transferLocation(Lati, Longi, listShow, searchText) {
    this.setState({
      Lati,
      Longi,
      listShow,
      searchText
    });
  }
  //navigation设置
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.start}`,
    headerRight: <TouchableOpacity style={styles.menubtn} onPress={navigation.state.params.navigatePress}>
      <Image source={require('../public/images/menu.png')} />
      <Badge type='capsule' count={navigation.state.params.pointNum} />
    </TouchableOpacity>,
    headerStyle: { elevation: 0 },
  });
  //首次加载
  componentDidMount() {
    this.props.navigation.setParams({
      pointNum: this.state.pointNum,
      navigatePress: this.navigatePress
    })
  }
  //首次加载之前
  componentWillMount() {
    let startName = JSON.stringify(this.props.navigation.state);
    let start = JSON.parse(startName);
    let geouri = 'http://restapi.amap.com/v3/geocode/geo?key=a12fe0a773225a0edbb395bce289a441&address=' + start.params.start;
    fetch(geouri)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          console.error('服务器繁忙，请稍后再试；\r\nCode:' + response.status)
        }
      })
      .then((data) => {
        let startArray = JSON.parse(JSON.stringify(data)).geocodes[0].location.split(',');
        this.setState({ Lati: parseFloat(startArray[1]), Longi: parseFloat(startArray[0]) });
      })
      .catch((err) => {
        console.error(err)
      });
    let regeouri = 'http://restapi.amap.com/v3/geocode/regeo?key=a12fe0a773225a0edbb395bce289a441&location=' + this.state.Longi + ',' + this.state.Lati;
    fetch(regeouri)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          console.error('服务器繁忙，请稍后再试；\r\nCode:' + response.status)
        }
      })
      .then((data1) => {
        let pointArray = JSON.parse(JSON.stringify(data1));
        let FormatAdd = pointArray.regeocode.formatted_address;
        this.setState({ FormatAdd });
      })
      .catch((err) => {
        console.error(err)
      })
  }
  //右上角菜单点击事件
  navigatePress = () => {
    Drawer.open(this.pointListView(), 'right')
  }
  //输入提示
  enterPrompt = (text) => {
    let searchuri = "http://restapi.amap.com/v3/assistant/inputtips?key=a12fe0a773225a0edbb395bce289a441&datatype=poi&keywords=" + text + "&location=" + this.state.Longi + "," + this.state.Lati;
    fetch(searchuri)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          console.error('服务器繁忙，请稍后再试；\r\nCode:' + response.status)
        }
      })
      .then((data) => {
        let searchArray = JSON.parse(JSON.stringify(data)).tips;
        searchArray = searchArray.slice(0, 3);
        this.setState({ listShow: true });
        this.setState({ searchArray }, () => {
          // alert(this.state.searchArray.length);
        });

      })
      .catch((err) => {
        console.error(err)
      });
  }
  endEdit() {
    this.props.navigation.navigate('TravelList',{state:1,pointList:this.state.pointList});
  }
  //右侧弹出抽屉View
  pointListView() {
    return (
      <View style={{ backgroundColor: Theme.defaultColor, height: 260 }}>
        {
          this.state.pointNum === 0 ? <View style={styles.drawerContainer}><Text>您还没有添加路径点</Text></View>
            : <View style={styles.drawerContainer}><ListRow
              title={'您已添加' + this.state.pointNum + '个路径点'}
            // swipeActions={[
            //   <ListRow.SwipeActionButton title='Cancel' />,
            //   <ListRow.SwipeActionButton title='Remove' type='danger' onPress={() => alert('Remove')} />,
            // ]}
            />
              {
                this.state.pointList.map((onePoint, index) => {
                  onePointNum = JSON.parse(JSON.stringify(onePoint)).pointNum;
                  onePointName = JSON.parse(JSON.stringify(onePoint)).pointName;
                  onePointCity = JSON.parse(JSON.stringify(onePoint)).pointCity;
                  onePointLongi = JSON.parse(JSON.stringify(onePoint)).pointLongi;
                  onePointLati = JSON.parse(JSON.stringify(onePoint)).pointLati;
                  return (<OnePoint
                    key={index}
                    num={onePointNum}
                    name={onePointName}
                    city={onePointCity}
                  />);
                })
              }
            </View>
        }
        {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Label type='detail' size='xl' text='Drawer' />
        </View> */}
      </View>
    )
  }
  render() {
    // let drawer = Drawer.show(pointList, 'right');
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.note}>
        <View style={styles.searchs}>
          <SearchInput style={styles.search} placeholder='search address' onChangeText={
            (text) => {
              this.enterPrompt(text);
              this.setState({ searchText: text });
            }
          }
            value={this.state.searchText}
          />
          {
            this.state.listShow ? <View style={styles.searchContext}>
              {
                this.state.searchArray.map((oneSearch, index) => {
                  oneValue = JSON.parse(JSON.stringify(oneSearch)).name;
                  oneDistrict = JSON.parse(JSON.stringify(oneSearch)).address;
                  oneLocation = JSON.parse(JSON.stringify(oneSearch)).location;
                  return (<OneSearch
                    key={index}
                    value={oneValue}
                    district={oneDistrict}
                    location={oneLocation}
                    transferLocation={
                      (Lati, Longi, listShow, searchText) => this.transferLocation(Lati, Longi, listShow, searchText)
                    }
                  />);
                })
              }
            </View> : null
          }
        </View>
        <MapView
          showsBuildings={false}
          locationEnabled={true}
          zoomLevel={15}
          style={StyleSheet.absoluteFill}
          showsZoomControls={false}
          showsLabels={true}
          coordinate={{
            latitude: this.state.Lati,
            longitude: this.state.Longi,
          }}
          onStatusChangeComplete={
            ({ nativeEvent }) => {
              let point = JSON.parse(JSON.stringify(nativeEvent));
              this.setState({ Lati: parseFloat(point.latitude.toFixed(5)), Longi: parseFloat(point.longitude.toFixed(5)) });
              let regeouri = 'http://restapi.amap.com/v3/geocode/regeo?key=a12fe0a773225a0edbb395bce289a441&extensions=all&location=' + this.state.Longi + ',' + this.state.Lati;
              fetch(regeouri)
                .then((response) => {
                  if (response.ok) {
                    return response.json()
                  } else {
                    console.error('服务器繁忙，请稍后再试；\r\nCode:' + response.status)
                  }
                })
                .then((data2) => {
                  let pointArray = JSON.parse(JSON.stringify(data2));
                  let FormatAdd = '';
                  let FormatCity = '';
                  // alert(JSON.stringify(pointArray.regeocode));
                  if (pointArray.regeocode.aois[0] === undefined) {
                    FormatAdd = pointArray.regeocode.addressComponent.city + pointArray.regeocode.addressComponent.district + pointArray.regeocode.addressComponent.township + pointArray.regeocode.addressComponent.streetNumber.number;
                  } else {
                    FormatAdd = pointArray.regeocode.aois[0].name;
                  }
                  this.setState({ FormatAdd });
                  if (pointArray.regeocode.addressComponent.city == '') {
                    FormatCity = pointArray.regeocode.addressComponent.province;
                  } else {
                    FormatCity = pointArray.regeocode.addressComponent.city;
                  }
                  this.setState({ FormatCity });
                })
                .catch((err) => {
                  console.error(err)
                })
            }}
        >
          <Marker
            draggable={false}
            title='nihao'
            active={true}
            infoWindowEnabled={true}
            coordinate={{
              latitude: this.state.Lati,
              longitude: this.state.Longi,
            }}>
            {/* <View style={styles.customInfoWindow}>
              <Text>{this.state.FormatAdd}</Text>
            </View> */}
            <View>
              <View style={styles.customInfoWindow}>
                <Text style={{ textAlign: 'center', }}>{this.state.FormatAdd}</Text>
              </View>
              {/* <Label text={this.state.FormatAdd} /> */}
            </View>
          </Marker>
        </MapView>
        <Button
          onPress={() => {
            let pointNum = this.state.pointNum + 1;
            this.setState({ pointNum }, () => {
              this.props.navigation.setParams({
                pointNum: this.state.pointNum
              });
            });
            let onePointInfo = {
              "pointNum": this.state.pointNum + 1,
              "pointName": this.state.FormatAdd,
              "pointCity": this.state.FormatCity,
              "pointLongi": this.state.Longi,
              "pointLati": this.state.Lati
            }
            let pointList = this.state.pointList;
            pointList.push(onePointInfo);
            this.setState(pointList);
          }}
          title="添加该点"
          style={styles.addbtn}
        >
        </Button>
        <TouchableOpacity style={styles.next} onPress = {this.endEdit.bind(this)}>
          <Image style={{ width: 40, height: 40}} source={require('../public/images/next.png')} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  note: {
    flex: 1,
  },
  next: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,

  },
  customInfoWindow: {
    width: 150,
    height: 60,
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(51,51,51,0.2)',
    borderRadius: 2,
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: { h: 10, w: 10 },
    justifyContent: 'center'
  },
  searchs: {
    zIndex: 9999,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  search: {
    width: 300,
    height: 40,
    marginTop: 5
  },
  addbtn: {
    width: 120,
    position: 'absolute',
    bottom: 20,
    left: Dimensions.get('window').width / 2 - 60,
  },
  menubtn: {
    justifyContent: 'center',
    zIndex: 9999,
    flexDirection: 'row',
    borderRadius: 0,
    backgroundColor: '#FFFFFF'
  },
  drawerContainer: {
    width: 160,
  }
});