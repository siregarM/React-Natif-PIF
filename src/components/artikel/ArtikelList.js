/* eslint-disable class-methods-use-this */
import React, { Component, PropTypes } from 'react';
import { ListView, View, TouchableWithoutFeedback, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Spinner, Item } from '../common';
import styles from './artikelStyle';

const propTypes = {
  getArtikelList: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

class ArtikelList extends Component {
  componentWillMount() {
    this.props.getArtikelList();

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ list }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.dataSource = ds.cloneWithRows(list);
  }

  renderRow(artikel) {
    const { title } = artikel;

    return (
      <TouchableWithoutFeedback
        onPress={() => { Actions.artikelEdit({ artikel }); }}
      >
        <View>
          <Item style={styles.listContainerStyle}>
            <Text style={styles.listTitleStyle}>{title}</Text>
          </Item>
        </View>
      </TouchableWithoutFeedback>

    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.loading
          ?
            <Spinner />
          :
            <ListView
              enableEmptySections
              dataSource={this.dataSource}
              renderRow={this.renderRow}
            />
            }             
      </View>
    );
  }
}

ArtikelList.propTypes = propTypes;

export default ArtikelList;
