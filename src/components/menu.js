import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';


class Menu extends Component {

  render() {

    return (
      <View>
        <Text onPress={() => Actions.artikel()}>List Restaurant <Icon name="rss" size={30} color="#900" /></Text>
        <Text onPress={() => Actions.post()}>List Makanan</Text>
        <Text onPress={() => Actions.upload()}>Upload</Text>
      </View>
    );
  }
}

export default Menu;
