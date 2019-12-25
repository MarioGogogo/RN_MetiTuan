
  /**
   * Sample React Native App
   * 逛一逛
   */

  import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Dimensions,
  View
} from 'react-native';
import NavBar from '../../common/NavBar'
import RNWebView from "../../common/RNWebView";

const { width } = Dimensions.get('window');

export default class DiscoverPage extends Component {

  render() {
    return (
      <View style={styles.flexStyle}>
        <NavBar title="逛一逛"/>
        <RNWebView
          source={{uri: 'https://i.meituan.com/'}}
          domStorageEnabled={true}
          javaScriptEnabled={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexStyle: {
    flex: 1,
    width:width
  },
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    marginTop:Platform.OS === 'android'?0:20
  },
  textStyle: {
    fontSize: 20,
    alignItems: 'center'
  },

});

