import React, { Component } from 'react';
import {
  AsyncStorage,
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
// import { Constants } from 'expo';
// import { Header } from 'react-native-elements';
import { Font, AppLoading } from "expo";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Root,
  Text,
  StyleProvider,
} from 'native-base';
import Clock from './components/Clock';

// material native-base theme
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import platform from './native-base-theme/variables/platform';
// import Storage from 'react-native-storage';


// var storage = new Storage({
//   storageBackend: AsyncStorage,
// })
//
// global.storage = storage

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      clocks: [
        {key: '🍼'},
        {key: '💤'},
        {key: '💩'},
        {key: '🚼'},
      ],
    }
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  handleAlert() {
    alert("What is going on")
  }

  render() {
    if (this.state.loading) {
      return (
        <Root>
          <AppLoading />
        </Root>
      )
    }
    return (
      <StyleProvider style={getTheme(platform)}>
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={this.handleAlert}>
                <Icon name='help'/>
              </Button>
            </Left>
            <Body>
              <Title>How Long</Title>
            </Body>
            <Right>
              <Button transparent onPress={this.handleAlert}>
                <Icon name='add'/>
              </Button>
            </Right>
          </Header>
          <Content>
            <FlatList
              data={this.state.clocks}
              renderItem={ ( {item} ) => <Clock name={ item.key }/> }
            />
          </Content>
        </Container>
      </StyleProvider>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'cadetblue',
  },
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'gainsboro',
  },
})
