import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import OneSearch from './components/OneSearch';
import OnePoint from './components/OnePoint';
import { MapView, Marker } from 'react-native-amap3d';
import TravelList from './TravelList';
import { SearchInput, Button, Badge, Theme, Label, Drawer, ListRow, TeaNavigator, BasePage, NavigationBar, Toast } from 'teaset';
import ButtonComponent from 'react-native-button-component';
export default class ReleaseTraTwo extends BasePage {

  constructor(props) {
    super(props);
    this.state = {
      Lati: 0,
      Longi: 0,
      FormatAdd: '',
      FormatCity: '',
      searchText: '',
      searchArray: [],
      listShow: false,
      pointNum: 0,
      pointList: [],
      drawer: '',
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
  static defaultProps = ({
    scene: TeaNavigator.SceneConfigs.PushFromRight,
  });
  //首次加载之前
  componentWillMount() {
    this.setState({ Lati: this.props.lati, Longi: this.props.longi }, () => {
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
    });

  }
  //右上角菜单点击事件
  navigatePress = () => {
    this.setState({ drawer: Drawer.open(this.pointListView(), 'right') });
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
        this.setState({ searchArray });
      })
      .catch((err) => {
        console.error(err)
      });
  }
  endEdit() {
    if (this.state.pointList != []) {
      this.navigator.push({ view: <TravelList pointList={this.state.pointList} title={this.props.title} photouri={this.props.photouri} /> })
    }
    else {
      Toast.sad('最少添加一个路径点');
    }
  }
  //右侧弹出抽屉View
  pointListView() {
    return (
      <ScrollView style={{ backgroundColor: Theme.defaultColor, height: Dimensions.get('window').height, width: 170 }}>
        {
          this.state.pointNum === 0 ? <View style={styles.drawerContainer}><ListRow
            title={'您还没有添加路径点'}
          /></View>
            : <View style={styles.drawerContainer}><ListRow
              title={'您已添加' + this.state.pointNum + '个路径点'}
            />
              {
                this.state.pointList.map((onePoint, index) => {
                  onePointNum = JSON.parse(JSON.stringify(onePoint)).pointNum;
                  onePointName = JSON.parse(JSON.stringify(onePoint)).pointName;
                  onePointCity = JSON.parse(JSON.stringify(onePoint)).pointCity;
                  onePointLongi = JSON.parse(JSON.stringify(onePoint)).pointLongi;
                  onePointLati = JSON.parse(JSON.stringify(onePoint)).pointLati;
                  return (
                    <OnePoint
                      key={index}
                      num={onePointNum}
                      name={onePointName}
                      city={onePointCity}
                      remove={(val) => this.removePoint(val)}
                    />
                  );
                })
              }
            </View>
        }
      </ScrollView>
    )
  }
  //删除一个路径点，给子组件调用
  removePoint(index) {
    let pointList1 = [];
    let pointList2 = [];
    let pointList3 = [];
    let pointList = [];
    if (this.state.pointList.length > 2) {
      pointList1 = this.state.pointList.slice(0, index - 1);
      pointList2 = this.state.pointList.slice(index);
      for (let i = 0; i < pointList2.length; i++) {
        pointList2[i].pointNum = pointList2[i].pointNum - 1;
      }
      pointList = pointList1.concat(pointList2);
    }
    else if (this.state.pointList.length == 2) {
      if (index == 1) {
        pointList = this.state.pointList.slice(1);
        pointList[0].pointNum = pointList[0].pointNum - 1;
      } else {
        pointList = this.state.pointList.slice(0, 1);

      }
    }
    this.setState({ pointList }, () => {
      this.setState({ pointNum: this.state.pointNum - 1 }, () => {
        this.state.drawer.close();
        this.setState({ drawer: Drawer.open(this.pointListView(), 'right') });
      })
    });
  }
  render() {
    return (
      <View style={styles.note}>
        <NavigationBar
          style={{ backgroundColor: 'rgb(65, 192, 115)', zIndex: 10000 }}
          type='ios'
          tintColor='#fff'
          title={this.props.title}
          leftView={<NavigationBar.BackButton title='Back'
            onPress={() => this.navigator.pop()
            } />}
          rightView={
            <TouchableOpacity style={styles.menubtn} onPress={this.navigatePress}>
              <Image source={require('../public/images/menu.png')} style={{ width: 24, height: 24 }} />
              <Badge type='capsule' count={this.state.pointNum} />
            </TouchableOpacity>
          }
        />
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
              this.setState({ Lati: parseFloat(point.latitude.toFixed(5)), Longi: parseFloat(point.longitude.toFixed(5)) }, () => {
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
              });

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
            <View>
              <View style={styles.customInfoWindow}>
                <Text style={{ textAlign: 'center', }}>{this.state.FormatAdd}</Text>
              </View>
            </View>
          </Marker>
        </MapView>
        <Button
          onPress={() => {
            let md6 = '2015063000000001' + String(this.state.FormatAdd) + '143566028812345678';
            var sign = md5(md6);
            let trauri = "http://api.fanyi.baidu.com/api/trans/vip/translate?q=" + encodeURI(String(this.state.FormatAdd)) + "&from=zh&to=en&appid=2015063000000001&salt=1435660288&sign=" + sign;
            fetch(trauri)
              .then((response) => {
                if (response.ok) {
                  return response.json()
                } else {
                  console.error('服务器繁忙，请稍后再试；\r\nCode:' + response.status)
                }
              })
              .then((data1) => {
                let pointNum = this.state.pointNum + 1;
                this.setState({ pointNum });
                let onePointInfo = {
                  "pointNum": this.state.pointNum,
                  "pointName": this.state.FormatAdd,
                  "pointCity": this.state.FormatCity,
                  "pointLongi": this.state.Longi,
                  "pointLati": this.state.Lati,
                  "pointEn": data1.trans_result[0].dst,
                }
                let pointList = this.state.pointList;
                pointList.push(onePointInfo);
                this.setState({ pointList });
              })
              .catch((err) => {
                console.error(err)
              });

          }}
          title="添加该点"
          style={styles.addbtn}
        >
        </Button>
        <TouchableOpacity style={styles.next} onPress={this.endEdit.bind(this)}>
          <Image style={{ width: 40, height: 40 }} source={require('../public/images/next.png')} />
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
    alignItems: 'center',
    marginTop: 65,
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
  },
  drawerContainer: {
    width: 160,
  }
});