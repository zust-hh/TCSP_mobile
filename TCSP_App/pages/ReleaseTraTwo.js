import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import { MapView, Marker } from 'react-native-amap3d';
import { SearchInput } from 'teaset';
export default class ReleaseTraTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Lati: 39.91095,
      Longi: 116.37296,
      FormatAdd: '',
      searchText: '',
      searchArray: [],
    }
  }
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.start}`,
    elevation: 0
  });

  enterPrompt = (text) => {
    let searchuri = "http://restapi.amap.com/v3/assistant/inputtips?key=a12fe0a773225a0edbb395bce289a441&keywords=" + text + "&location=" + this.state.Longi + "," + this.state.Lati;
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
        // alert(JSON.parse(JSON.stringify(searchArray)));
        // this.setState({searchArray});
        this.setState({ searchArray }, () => {
          alert(this.state.searchArray);
        });
      })
      .catch((err) => {
        console.error(err)
      });
  }

  componentDidMount() {
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

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.note}>
        <View style={styles.searchs}>
          <SearchInput style={styles.search} placeholder='search address' onChangeText={
            (text) => {
              this.enterPrompt(text);
              // alert(this.state.searchArray);
            }
          } />
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
              let regeouri = 'http://restapi.amap.com/v3/geocode/regeo?key=a12fe0a773225a0edbb395bce289a441&location=' + this.state.Longi + ',' + this.state.Lati;
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
                  let FormatAdd = pointArray.regeocode.formatted_address;
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
            <View style={styles.customInfoWindow}>
              <Text>{this.state.FormatAdd}</Text>
            </View>
          </Marker>
        </MapView>
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
    height: 50
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
  }
});