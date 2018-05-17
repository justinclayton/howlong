import React, { Component } from 'react';
import {
  AsyncStorage,
  View,
  ListView,
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
  List,
  ListItem,
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
const defaultClocks = [ '🍼', '💤', '💩', '🚼', ]

export default class App extends Component {
  constructor(props) {
    super(props)

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      loading: true,
      listViewData: defaultClocks,
    }

    this.addClock = this.addClock.bind(this);
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

  addClock() {
    let newClock = '🌈'
    let clocksList = this.state.listViewData
    clocksList.push(newClock)
    this.setState({listViewData: clocksList})
  }

  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.listViewData];
    newData.splice(rowId, 1);
    this.setState({ listViewData: newData });
  }

  // deleteRow(secId, rowId, rowMap) {
  //   alert("would delete row")
  // }

  render() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
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
              <Button transparent onPress={this.addClock}>
                <Icon name='add'/>
              </Button>
            </Right>
          </Header>
          <Content>
            {
              // handy tip: if you want to rerender updated state, make it props to a component.
              // this might mean you need to make more components than you thought, but that's fine.
            }
            <List
              dataSource={this.ds.cloneWithRows(this.state.listViewData)}
              renderRow={data =>
                <Clock name={data}/>
              }
              renderLeftHiddenRow={data =>
                <Button full onPress={() => alert(data)}>
                  <Icon active name="information-circle" />
                </Button>
              }
              renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                  <Icon active name="trash" />
                </Button>
              }
              leftOpenValue={75}
              rightOpenValue={-75}
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
