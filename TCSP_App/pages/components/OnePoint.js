import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Badge } from 'teaset';
export default class OnePoint extends Component {
  render() {
    return (
      <View style={styles.onepoint}>
        <Badge type='capsule' count={this.props.num} />
        <View style={{marginLeft:10}}>
          <Text>{this.props.name}</Text>
          <Text style={{fontSize:10,color:"rgb(40,44,52)"}}>{this.props.city}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  onepoint: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
});
module.exports = OnePoint;