// modified version of 'react-native-stopwatch-timer'

import { Body, Left, ListItem, Text } from "native-base";
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import Stopwatch from "../components/StopWatch";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clockStart: true,
      clockReset: false
    };
    this.toggleClock = this.toggleClock.bind(this);
    this.resetClock = this.resetClock.bind(this);
  }

  toggleClock() {
    this.setState({ clockStart: !this.state.clockStart, clockReset: false });
  }

  resetClock() {
    this.setState({ clockStart: false, clockReset: true });
    this.setState({ clockStart: true, clockReset: false });
    alert("clock reset");
  }

  getFormattedTime(time) {
    this.currentTime = time;
  }

  render() {
    let foo = this.state.clockStart ? styles.active : "";

    return (
      <ListItem button onLongPress={this.resetClock}>
        <Left>
          <Text>{this.props.name}</Text>
        </Left>
        <Body>
          <Stopwatch
            start={this.state.clockStart}
            reset={this.state.clockReset}
            options={{
              container: styles.clockContainer,
              text: styles.clockText
            }}
            getTime={this.getFormattedTime}
          />
        </Body>
      </ListItem>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    flex: 1,
    fontSize: 76,
    color: "black"
  },
  clockContainer: {},
  clockText: {
    flex: 1,
    fontSize: 30,
    fontWeight: "bold",
    color: "steelblue"
  },
  active: {
    color: "red"
  }
});

export default Clock;
