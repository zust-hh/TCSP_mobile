import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Button,
  Image
} from 'react-native';
import { MapView, HeatMap, Marker } from 'react-native-amap3d';
import { StackNavigator } from 'react-navigation';
import ReleaseTraOne from './ReleaseTraOne';
import ReleaseTraTwo from './ReleaseTraTwo';
import TravelList from './TravelList';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 39.91095,
      longitude: 116.37296,
    }
  }
  static navigationOptions = {
    header: false,
  }
  // packJson = [{ "latitude": 39.5, "longitude": 116, "count": 8 }, { "latitude": 40.5, "longitude": 116, "count": 10 }];
  packJson = (new Array(5000)).fill(0).map(i => ({
    latitude: 29.5 + (Math.random()),
    longitude: 119.5 + (Math.random()),
  }))
  _json = JSON.stringify(this.packJson);
  _coordinates = JSON.parse(this._json);

  // _getLocation = () => {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       let initialPosition = JSON.stringify(position);
  //       let locations = JSON.parse(initialPosition);
  //       AsyncStorage.setItem('location', locations);
  //       // alert(locations.coords.longitude);
  //       this.setState({ latitude: locations.coords.latitude });
  //       this.setState({ longitude: locations.coords.longitude });
  //       // alert(this.state.latitude);
  //     },
  //     (error) => console.log(new Date() + JSON.stringify(error)),
  //     { enableHighAccuracy: true, timeout: 5000, maximumAge: 3000 }
  //   );
  // }

  // componentWillMount() {
  //   this._getLocation();
  // }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.body}>
        <MapView
          showsBuildings={false}
          locationEnabled={true}
          zoomLevel={15}
          style={StyleSheet.absoluteFill}
          showsZoomControls={false}
          showsLocationButton={true}
          showsLabels={true}
          onLocation={({ nativeEvent }) => {
            this.setState({ latitude: nativeEvent.latitude });
            this.setState({ longitude: nativeEvent.longitude });
          }}

          coordinate={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
          }}
        >
          <HeatMap
            opacity={0.8}
            radius={20}
            coordinates={this._coordinates} />
        </MapView>
        <View style={styles.button}>
          <TouchableHighlight onPress={() => navigate('ReleaseTraOne')} style={styles.btn} activeOpacity={0.7} underlayColor='rgb(53,122,232)'>
            <Image style={{ width: 16, height: 16, }} source={require('../public/images/plus.png')} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

export default SimpleApp = StackNavigator({
  Home: { screen: Home },
  ReleaseTraOne: { screen: ReleaseTraOne },
  ReleaseTraTwo: { screen: ReleaseTraTwo },
  TravelList: { screen: TravelList },

});

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  button: {
    bottom: 20,
    right: 20,
    position: 'absolute',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#18B4FF',
    justifyContent: 'center',
    alignItems: 'center',
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  text: {
    height: 54,
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: "900"
  },
});
