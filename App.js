import { Container, Content, List, StyleProvider } from "native-base";
import React, { Component } from "react";
import { AsyncStorage, StyleSheet } from "react-native";
import AddBox from "./components/AddBox";
import Clock from "./components/Clock";
import Top from "./components/Top";
// material native-base theme
import getTheme from "./native-base-theme/components";
import platform from "./native-base-theme/variables/platform";

const CLOCKS_KEY = "Clocks";

export default class App extends Component {
  state = { clocks: [] };

  constructor(props) {
    super(props);

    this.setInitialState = this.setInitialState.bind(this);
  }

  componentDidMount() {
    this.setInitialState();
  }

  setInitialState() {
    console.log(`starting setInitialState()`);
    let initialState = this.read();
    var clocks;
    console.log(`initial storage state is ${JSON.stringify(initialState)}`);
    clocks = ["Bums"];
    this.write(clocks);
    console.log(`setting react state to ${clocks}`);
    this.setState({ clocks: clocks });
    console.log(`leaving setInitialState()`);
  }

  async read() {
    console.log(`starting read()`);
    let data = await AsyncStorage.getItem(CLOCKS_KEY);
    console.log(`read(): data is ${JSON.stringify(data)}`);
    let jsonData = JSON.parse(data);
    console.log(`read(): jsonData is ${jsonData}`);
    console.log(`leaving read()`);
    return jsonData;
  }

  async write(data) {
    console.log(`starting write()`);
    try {
      await AsyncStorage.setItem(CLOCKS_KEY, JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
    console.log(`leaving write()`);
  }

  async addClock(text) {
    console.log(`starting addClock()`);
    console.log(`addClock(): text is ${text}`);
    if (text != "") {
      this.setState({ textValue: "" });
      let clockList = await this.read();
      console.log(typeof clockList);
      console.log(`addClock(): clockList is ${clockList}`);
      let newClockList = clockList.push(text);
      console.log(`addClock(): newClockList is ${newClockList}`);
      this.setState({ clocks: newClockList });
      this.write(newClockList);
    }
    console.log(`leaving addClock()`);
  }

  onHelp() {
    alert(`resetting storage`);
    this.setState({ clocks: [] });
    this.write([]);
  }

  render() {
    return (
      <StyleProvider style={getTheme(platform)}>
        <Container>
          <Top onHelp={() => this.onHelp()} onAdd={() => this.addClock("R")} />
          <Content>
            <AddBox
              onSubmitEditing={() => this.addClock(this.state.textValue)}
              onChangeText={text => this.setState({ textValue: text })}
              onAdd={() => this.addClock(this.state.textValue)}
            />
            <List
              dataArray={this.state.clocks}
              renderRow={clock => <Clock name={clock} />}
            />
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "cadetblue"
  },
  container: {
    flex: 1,
    alignItems: "stretch",
    backgroundColor: "gainsboro"
  }
});
