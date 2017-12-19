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
import { TeaNavigator, BasePage } from 'teaset';
import ReleaseTraOne from './ReleaseTraOne';
export default class Home extends BasePage {
  static defaultProps = {
    scene: TeaNavigator.SceneConfigs.PushFromRight,
  };
  constructor(props) {
    super(props);
    this.state = {
      latitude: 39.91095,
      longitude: 116.37296,
      heatpoint: [],
      zoomlevel: 15
    }
  }
  packJson = (new Array(50)).fill(0).map(i => ({
    latitude: 29.5 + (Math.random()),
    longitude: 119.5 + (Math.random()),
  }))
  _json = JSON.stringify(this.packJson);
  _coordinates = JSON.parse(this._json);
  render() {
    return (
      <View style={styles.body}>
        <MapView
          showsBuildings={false}
          locationEnabled={true}
          zoomLevel={this.state.zoomlevel}
          style={StyleSheet.absoluteFill}
          showsZoomControls={false}
          showsLocationButton={true}
          showsLabels={true}
          onLocation={({ nativeEvent }) => {
            this.setState({ latitude: nativeEvent.latitude });
            this.setState({ longitude: nativeEvent.longitude });
            let uri = 'http://192.168.1.113:8080/map/getRoutepointListByPosition/latitude/'+nativeEvent.latitude+'/longitude/'+nativeEvent.longitude+'/radius/'+this.state.zoomlevel;
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
                let heatpoint = [];
                for(let i = 0;i<res.length;i++){
                  let one = [res[i].latitude,res[i].longitude];
                  heatpoint.push(one);
                }
                this.setState({ heatpoint });
              })
              .done();
          }}

          coordinate={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
          }}
        >
          <HeatMap
            opacity={0.8}
            radius={20}
            coordinates={this.state.heatpoint} />
        </MapView>
        <View style={styles.button}>
          <TouchableHighlight onPress={() => this.navigator.push({ view: <ReleaseTraOne /> })} style={styles.btn} activeOpacity={0.7} underlayColor='rgb(53,122,232)'>
            <Image style={{ width: 16, height: 16, }} source={require('../public/images/plus.png')} />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

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
