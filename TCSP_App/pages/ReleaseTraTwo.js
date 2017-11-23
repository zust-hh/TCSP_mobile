import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MapView, Marker, Polyline } from 'react-native-amap3d';
export default class ReleaseTraTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startLati: 39.91095,
      startLongi: 116.37296,
      key: '58085c17e4163a804ec178707f6e5734',
    }
  }
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.start}`,
    elevation: 0
  });
  componentWillMount() {
    let startName = JSON.stringify(this.props.navigation.state);
    let start = JSON.parse(startName);
    this.setState({ startName: start.params.start });
    // alert(this.state.startName + '-' +start.params.start);
    let uri = 'http://restapi.amap.com/v3/geocode/geo?key=a12fe0a773225a0edbb395bce289a441&address=' + start.params.start;
    // alert(uri);
    fetch(uri)
    .then((response) => {
        if (response.ok) {
            return response.json()
        } else {
            console.error('服务器繁忙，请稍后再试；\r\nCode:' + response.status)
        }
    })
    .then((data) => {
        let x = JSON.stringify(data);
        let y = JSON.parse(x);
        alert(y.geocodes[0].location);
    })
    .catch((err)=> {
        console.error(err)
    })
  }
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.note}>
        <Text>13</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  note: {
    flex: 1,
  }
});