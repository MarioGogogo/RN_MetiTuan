/**
 * Sample React Native App
 * 个人设置界面
 */

import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View, StatusBar,
  Image
} from 'react-native'
import {Actions, Scene, Router} from 'react-native-router-flux'

import NavigationBar from '../../common/NavigationBar'
// import ViewUtils from '../util/ViewUtils'
import ItemCell from "./MineItemCell";
import LoginPage from "../../Login";

import SpacingView from "../../common/SpacingView";
import Separator from "../../common/Separator";
const {width} = Dimensions.get('window');

export default class SettingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      canGoBack: false,
    }
  }

  //返回
  onBackPress(e) {
    this.props.navigator.pop();
  }

  userInfo=()=>{
    console.log('userinfo')
    Actions.userInfo()
  }

  findPassword = ()=>{
    Actions.findBackPassword()
  }

  logOut =()=> {
    //重置路由
    Actions.reset('login')
  }

  renderView() {
    return (
      <View style={{flex:1,backgroundColor:'#f3f3f3'}}>
        <TouchableOpacity>
          <ItemCell title='个人信息' onPress={this.userInfo} />
        </TouchableOpacity>
        <Separator/>
        <ItemCell title='账号与安全' subtitle='换手机改密码' onPress={this.findPassword} />
        <SpacingView/>
        <ItemCell title='通用' />
        <SpacingView/>
        <TouchableOpacity style={styles.styleSubmit} onPress={this.logOut}>
          <Text >退出账号 </Text>
        </TouchableOpacity>
      </View>
    )
  }

  getLeftBlackButton=(callBack)=> {
    return <TouchableOpacity
      style={{padding: 8}}
      onPress={callBack}>
      <Image
        style={{width: 26, height: 26,}}
        source={require('../../images/ic_back_white.png')}/>
    </TouchableOpacity>
  }

  render() {
    return (
      <View style={styles.flexStyle}>
        <StatusBar
          animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden
          hidden={false}  //是否隐藏状态栏。
          backgroundColor={'red'} //状态栏的背景色
          translucent={true}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。
          barStyle={'dark-content'} // enum('default', 'light-content', 'dark-content')
        />
        <NavigationBar
          style={{backgroundColor:'#ffffff',paddingTop:20}}
          popEnabled={false}
          // leftButton = {true}
          leftButton={this.getLeftBlackButton(() => this.onBackPress())}
          title='设置'
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
  styleSubmit: {
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: '#ffffff',
    height: 40,
    borderRadius: 5,
    borderColor:'#e9e9e9',
    justifyContent: 'center',
    alignItems: 'center',

  },
  buyButton: {
    backgroundColor: '#ffffff',
    width: 94,
    height: 36,
    borderRadius: 3,
  },

});

