import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
export default class TestListcom extends Component {

  render() {
    return (
      <View style={styles.note} key={this.props.keyval}>
        <Text style={styles.nodeText}>{this.props.val.date}</Text>
        <Text style={styles.nodeText}>{this.props.val.note}</Text>
        <TouchableOpacity onPress={this.props.deleteMethod} style={styles.noteDelete}>
        <Text style={styles.noteDeleteText}>-</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  note: {
    position: 'relative',
    padding: 20,
    paddingRight: 100,
    borderBottomWidth: 2,
    borderBottomColor: '#ededed',
  },
  noteText: {
    paddingLeft: 20,
    borderLeftWidth:10,
    borderLeftColor: '#e91e63',
  },
  noteDelete: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5980b9',
    padding: 10,
    top:10,
    bottom:10,
    right:10,
  },
  noteDeleteText: {
    color: '#FFFFFF',
  }
});
module.exports = TestListcom;