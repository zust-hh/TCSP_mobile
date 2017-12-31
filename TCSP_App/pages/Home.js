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
      latitude: 39,
      longitude: 119,
      heatpoint: [],
      zoomlevel: 15
    }
  }

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
            let uri = ip + ':8080/map/getRoutepointListByPosition/latitude/' + nativeEvent.latitude + '/longitude/' + nativeEvent.longitude + '/radius/' + this.state.zoomlevel;
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
                for (let i = 0; i < res.routepointList.length; i++) {
                  let one = {
                    latitude: res.routepointList[i].latitude,
                    longitude: res.routepointList[i].longitude,
                    score: res.routepointList[i].score
                  };
                  heatpoint.push(one);
                }
                heatpoint = JSON.parse(JSON.stringify(heatpoint));
                this.setState({ heatpoint }, () => {
                  // alert(this.state.heatpoint);
                })
              })
              .done();
          }}

          coordinate={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
          }}
        >
          {
            this.state.heatpoint.length > 0 &&
            this.state.heatpoint.map((oneheat, index) => {
              return (
                <HeatMap
                  key={index}
                  opacity={oneheat.score * 0.2}
                  radius={20}
                  coordinates={[oneheat]} />
              )
            })
          }

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
