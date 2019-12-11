/**
 * https://github.com/facebook/react-native
 * @flow GridItem上边图片下边文字
 */

import React, { Component } from 'react';
import { View, StyleSheet,Dimensions, TouchableOpacity, Image,Text } from 'react-native';


const { width,height } = Dimensions.get('window');

export default class ActiveItem extends Component {
  render() {
    let info = this.props.info

    let title = info.maintitle
    let color = info.typeface_color
    let subtitle = info.deputytitle
    let imageUrl = info.imageurl

    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <View>
          <Text style={{ color: color, marginBottom: 10}}>{title}</Text>
          <Text >{subtitle}</Text>
        </View>

        <Image style={styles.icon} source={{uri: imageUrl}} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 2 - 0.5,
    height: width / 4,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#e9e9e9'
  },
  icon: {
    width: width / 5,
    height: width / 5,
  }
});

