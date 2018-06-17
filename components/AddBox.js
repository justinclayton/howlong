import { Button, Icon, Input, Item, Right } from "native-base";
import React, { Component } from "react";

class AddBox extends Component {
  state = {};

  render() {
    return (
      <Item rounded>
        <Input
          placeholder="Clock Name"
          onSubmitEditing={this.props.onSubmitEditing}
          onChangeText={this.props.onChangeText}
        />
        <Right>
          <Button transparent onPress={this.props.onAdd}>
            <Icon name="add" />
          </Button>
        </Right>
      </Item>
    );
  }
}

export default AddBox;
