import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableHighlight } from 'react-native';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';

export default class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clockStart: false,
      clockReset: false,
    };
    this.toggleClock = this.toggleClock.bind(this);
    this.resetClock = this.resetClock.bind(this);
  }

  toggleClock() {
    this.setState({clockStart: !this.state.clockStart, clockReset: false});
  }

  resetClock() {
    this.setState({clockStart: false, clockReset: true});
  }

  getFormattedTime(time) {
      this.currentTime = time;
  }

  render() {
    return (
      <TouchableHighlight onPress={this.toggleClock} onLongPress={this.resetClock}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.name}>{this.props.name}</Text>
          <Stopwatch start={this.state.clockStart}
            reset={this.state.clockReset}
            options={{container: styles.clockContainer, text: [styles.clockText, this.state.clockStart && styles.active]}}
            getTime={this.getFormattedTime}
          />
      </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  name: {
    flex: 1,
    fontSize: 76,
    color: 'black',
  },
  clockContainer: {
  },
  clockText: {
    flex: 1,
    fontSize: 42,
    fontWeight: 'bold',
    color: 'steelblue',
  },
  active: {
    color: 'red'
  },
})
