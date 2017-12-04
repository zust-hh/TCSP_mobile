import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
export default class OneSearch extends Component {
  render() {
    return (
      <TouchableOpacity style={styles.onesearch} key={this.props.keyval} onPress = {
        () => {
          let locationArray = this.props.location.split(',');
          this.props.transferLocation(parseFloat(locationArray[1]),parseFloat(locationArray[0]),false,'');
          // alert(this.props.location);
        }
      }>
        <Image style={{ width: 20, height: 20,marginRight:10 }} source={require('../../public/images/address.png')} />
        <View>
          <Text>{this.props.value}</Text>
          <Text>{this.props.district}</Text>
        </View>
      </TouchableOpacity>

    );
  }
}

const styles = StyleSheet.create({
  onesearch: {
    alignItems: 'center',
    width: 300,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ededed',
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
});
module.exports = OneSearch;