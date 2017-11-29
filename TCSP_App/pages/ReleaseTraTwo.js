import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import OneSearch from './components/OneSearch';
import { MapView, Marker } from 'react-native-amap3d';
import { SearchInput, Button } from 'teaset';
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component';
export default class ReleaseTraTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Lati: 39.91095,
      Longi: 116.37296,
      FormatAdd: '',
      searchText: '',
      searchArray: [],
      listShow: false,
      pointNum: 0
    }
  }
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.start}`,
    headerRight: <TouchableOpacity style={styles.menubtn}>
      <View>
        <Text style={{ color: '#000' }}>已选{navigation.state.params.pointNum}点</Text>
      </View>
    </TouchableOpacity>,
    headerStyle: { elevation: 0 },

  });

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
  componentDidMount() {
    this.props.navigation.setParams({
      pointNum: this.state.pointNum
    })
  }
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
  transferLocation(Lati, Longi, listShow, searchText) {
    this.setState({
      Lati,
      Longi,
      listShow,
      searchText
    });
  }
  render() {
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
                  // alert(JSON.stringify(pointArray.regeocode));
                  if (pointArray.regeocode.aois[0] === undefined) {
                    FormatAdd = pointArray.regeocode.addressComponent.city + pointArray.regeocode.addressComponent.district + pointArray.regeocode.addressComponent.township + pointArray.regeocode.addressComponent.streetNumber.number;
                  } else {
                    FormatAdd = pointArray.regeocode.aois[0].name;
                  }
                  this.setState({ FormatAdd });
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
        <ButtonComponent
          onPress={() => {
            let pointNum = this.state.pointNum + 1; 
            this.setState({ pointNum }, () => {
              this.props.navigation.setParams({
                pointNum: this.state.pointNum
              });
            });
          }}
          backgroundColors={['#4DC7A4', '#66D37A']}
          text="添加该点"
          style={styles.addbtn}
        >
        </ButtonComponent>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  note: {
    flex: 1,
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
    width: 50,
    height: 30,
    zIndex: 9999,
    // position: 'absolute',
    // bottom: 10,
    // right: 0,
    borderRadius: 0,
    backgroundColor: '#FFFFFF'
  }
});