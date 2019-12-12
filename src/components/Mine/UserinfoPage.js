/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 个人信息
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  View
} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux'
import NavigationBar from '../../common/NavigationBar'
// import ViewUtils from '../util/ViewUtils'
import ItemCell from "./MineItemCell";
// import AddressPage from "../mine/AddressPage";
import SpacingView from "../../common/SpacingView";
import Separator from "../../common/Separator";
import { Text16, Text14, Paragraph } from '../../common/Text'
import {scaleWidth,scaleHeight} from "../../util/ScreenUtil";

const {width} = Dimensions.get('window');

export default class UserinfoPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      canGoBack: false,
    }
  }

  onBackPress(e) {
    this.props.navigator.pop();
  }

  address =()=> {
    Actions.address()
  }

  renderView() {
    return (
      <View style={{flex:1,backgroundColor:'#f3f3f3'}}>

        <View style={[styles.avertStyle]}>
          <Text14>头像</Text14>
          <View style={{ flex: 1, backgroundColor: 'blue' }} />
          <Image source={require('../../images/ic_avatar_default.png')} style={{width: scaleWidth(46), height: scaleHeight(46), borderRadius: scaleWidth(23)}}/>
          <Image style={styles.arrow} source={require('../../images/icon_arrow.png')} />
        </View>
        <Separator/>
        <ItemCell title='昵称' subtitle='shat'/>
        <Separator/>
        <ItemCell title='生日'/>
        <Separator/>
        <ItemCell title='收货地址' subtitle='添加/修改' onPress={this.address} />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.flexStyle}>
        <NavigationBar
          navigator={this.props.navigator}
          style={{backgroundColor:'#ffffff'}}
          popEnabled={false}
          // leftButton={ViewUtils.getLeftBlackButton(() => this.onBackPress())}
          title='个人信息'
          titleColor='#000000'
        />
        <SpacingView/>
        {this.renderView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexStyle: {
    flex: 1,
    width: width,
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avertStyle: {
    paddingTop: 5,
    paddingBottom:5,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 10,
  },
  arrow: {
    width: 14,
    height: 14,
    marginLeft: 5,
  }

});

