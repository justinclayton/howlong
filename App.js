import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Input,
  Item,
  Left,
  List,
  Right,
  StyleProvider,
  Title
} from "native-base";
import React, { Component } from "react";
import { AsyncStorage, Keyboard, Platform, StyleSheet } from "react-native";
import Clock from "./components/Clock";
// material native-base theme
import getTheme from "./native-base-theme/components";
import platform from "./native-base-theme/variables/platform";

const CLOCKS_KEY = "Clocks";
const isAndroid = Platform.OS == "android";
const viewPadding = 10;

let Clocks = {
  convertToArrayOfObject(clocks, callback) {
    return callback(
      clocks
        ? clocks.split("||").map((clock, i) => ({ key: i, text: clock }))
        : []
    );
  },
  convertToStringWithSeparators(clocks) {
    return clocks.map(clock => clock.text).join("||");
  },
  all(callback) {
    return AsyncStorage.getItem("CLOCKS", (err, clocks) =>
      this.convertToArrayOfObject(clocks, callback)
    );
  },
  save(clocks) {
    AsyncStorage.setItem("CLOCKS", this.convertToStringWithSeparators(clocks));
  }
};

export default class App extends Component {
  state = { clocks: [], text: "" };

  changeTextHandler = text => {
    this.setState({ text: text });
  };

  addClock = () => {
    let notEmpty = this.state.text.trim().length > 0;

    if (notEmpty) {
      this.setState(
        prevState => {
          let { clocks, text } = prevState;
          return {
            clocks: clocks.concat({
              key: clocks.length,
              text: text
            }),
            text: ""
          };
        },
        () => Clocks.save(this.state.clocks)
      );
    }
  };

  deleteClock = i => {
    this.setState(
      prevState => {
        let clocks = prevState.clocks.slice();

        clocks.splice(i, 1);

        return { clocks: clocks };
      },
      () => Clocks.save(this.state.clocks)
    );
  };

  deleteAllClocks() {
    alert(`resetting local storage`);
    this.setState({ clocks: [], text: "" });
    Clocks.save(this.state.clocks);
  }

  componentDidMount() {
    Keyboard.addListener(
      isAndroid ? "keyboardDidShow" : "keyboardWillShow",
      e =>
        this.setState({
          viewMargin: e.endCoordinates.height + viewPadding
        })
    );

    Keyboard.addListener(
      isAndroid ? "keyboardDidHide" : "keyboardWillHide",
      () => this.setState({ viewMargin: viewPadding })
    );

    Clocks.all(clocks => this.setState({ clocks: clocks || [] }));
  }

  render() {
    return (
      <StyleProvider style={getTheme(platform)}>
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => this.deleteAllClocks()}>
                <Icon name="help" />
              </Button>
            </Left>
            <Body>
              <Title>How Long</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <Item rounded>
              <Input
                placeholder="Clock Name"
                clearButtonMode="always"
                onSubmitEditing={() => this.addClock()}
                onChangeText={text => this.setState({ text: text })}
              />
            </Item>
            <List
              dataArray={this.state.clocks}
              renderRow={clock => <Clock name={clock.text} />}
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
