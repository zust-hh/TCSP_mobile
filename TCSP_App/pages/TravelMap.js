import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Linking,
  ImageBackground,
} from 'react-native';
import { MapView, Polyline, Marker } from 'react-native-amap3d';
import {Badge} from 'teaset';
export default class TravelMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linecount: []
    }
  }
  static navigationOptions = ({ navigation }) => ({
    headerTitle: '行程地图',
    headerStyle: { elevation: 0, backgroundColor: 'rgb(65, 192, 115)' },
    headerBackTitleStyle: { color: '#FFFFFF' },
    headerTintColor: '#fff',
  });
  _onPress = () => Alert.alert('onPress');
  componentWillMount() {
    let linecount = [];
    for (let i = 0; i < this.props.navigation.state.params.pointList.length - 1; i = i + 1) {
      let line = [this.props.navigation.state.params.pointList[i].pointLati, this.props.navigation.state.params.pointList[i].pointLongi, this.props.navigation.state.params.pointList[i + 1].pointLati, this.props.navigation.state.params.pointList[i + 1].pointLongi];
      linecount.push(line);
    }
    this.setState({ linecount })
  }
  render() {
    return (
      <MapView style={StyleSheet.absoluteFill}
        coordinate={{
          latitude: this.state.linecount[0][0],
          longitude: this.state.linecount[0][1],
        }}
      >
        {
          this.props.navigation.state.params.pointList.map((onePoint, index) => {
            onePointNum = JSON.parse(JSON.stringify(onePoint)).pointNum;
            onePointName = JSON.parse(JSON.stringify(onePoint)).pointName;
            onePointCity = JSON.parse(JSON.stringify(onePoint)).pointCity;
            onePointLongi = JSON.parse(JSON.stringify(onePoint)).pointLongi;
            onePointLati = JSON.parse(JSON.stringify(onePoint)).pointLati;
            let url = 'androidamap://route?did=BGVIS2&dlat=' + onePointLati + '&dlon=' + onePointLongi + '&dname=' + onePointName + '&dev=0&m=0&t=2';
            return (<Marker
              key={index}
              draggable={false}
              icon={() => (
                <View style={styles.customMarker}>
                  <Badge style={{ backgroundColor: '#5bc0de', paddingLeft: 0, paddingRight: 0 }}>
                    <Text style={{ color: '#fff' }}>{index + 1}</Text>
                  </Badge>
                </View>
              )}
              coordinate={{
                latitude: onePointLati,
                longitude: onePointLongi,
              }}>
              <View style={styles.customInfoWindow}>
                <View style={{ width: 230, paddingLeft: 15, paddingTop: 10 }}>
                  <Text style={{ fontSize: 16 }}>{onePointName}</Text>
                </View>
                <TouchableOpacity style={{ width: 100, paddingTop: 4 }} activeOpacity={0.8} onPress={() => {
                  Linking.canOpenURL(url).then(supported => {
                    if (supported) {
                      Linking.openURL(url);
                    } else {
                      console.log('无法打开该URI: ' + this.props.url);
                    }
                  })
                }}>
                  <Image source={require('../public/images/mappointright.png')} style={{ width: 65, height: 60 }} />
                </TouchableOpacity>
              </View>
            </Marker>);
          })
        }
        {
          this.state.linecount.map((onePoint, index) => {
            return (<Polyline
              key={index}
              width={5}
              color='rgba(255, 0, 0,0.5)'
              coordinates={[
                {
                  latitude: onePoint[0],
                  longitude: onePoint[1],
                },
                {
                  latitude: onePoint[2],
                  longitude: onePoint[3],
                },
              ]} />);
          })
        }


      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  markerText: {
    color: '#fff',
    width: 30,
    height: 30,
  },
  customMarker: {
    width: 30,
    height: 30,
    alignItems: 'center',
    padding: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#36485f",
    paddingLeft: 60,
    paddingRight: 60
  },
  regist: {
    alignSelf: 'stretch',
  },
  header: {
    fontSize: 24,
    color: '#fff',
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#199187'
  },
  textinput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 30,
    color: '#fff',
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1,
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#59cbbd',
    marginTop: 30,
  },
  btntext: {
    color: '#fff',
    fontWeight: 'bold',
  },
  customInfoWindow: {
    width: 300,
    height: 70,
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(51,51,51,0.2)',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: { h: 10, w: 10 },
    flexDirection: 'row',
  }
})
