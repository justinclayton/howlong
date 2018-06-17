import { Body, Button, Header, Icon, Left, Right, Title } from "native-base";
import React from "react";

export default class Top extends React.Component {
  render() {
    return (
      <Header>
        <Left>
          <Button transparent onPress={this.props.onHelp}>
            <Icon name="help" />
          </Button>
        </Left>
        <Body>
          <Title>How Long</Title>
        </Body>
        <Right>
          <Button transparent onPress={this.props.onAdd}>
            <Icon name="add" />
          </Button>
        </Right>
      </Header>
    );
  }
}
