import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Constants } from 'expo';

// You can import from local files
import Clock from './components/Clock';

// or any pure javascript modules available in npm
// import { Card } from 'react-native-elements'; // Version can be specified in package.json

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      clocks: [
        {key: '💩'},
        {key: '🍼'},
        {key: '💤'},
        {key: '🚼'},
      ]
    }
  }

  render() {
    return (
      <View style={[styles.container, {backgroundColor: 'lightgrey'}]}>
      <FlatList
        data={this.state.clocks}
        renderItem={ ( {item} ) => <Clock name={ item.key } /> }
      />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#cf0f10',
  },
})
