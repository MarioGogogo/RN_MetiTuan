/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 个人订单
 */

import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  Dimensions,
  View, StatusBar
} from 'react-native'
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import NavigationBar from '../../common/NavigationBar'
// import ViewUtils from '../util/ViewUtils'
import OrderItemView from "./OrderItemView";
import Separator from "../../common/Separator";

const { width } = Dimensions.get('window');

export default class OrderPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      canGoBack: false,
    }
  }

  onBackPress(e) {
    this.props.navigator.pop();
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
          // leftButton={ViewUtils.getLeftGreenButton(()=>this.onBackPress())}
          title='我的订单'
          titleColor='#000000'
        />
        <Separator/>

        <View style={styles.container}>
          <ScrollableTabView
            renderTabBar={() => <DefaultTabBar />}
            tabBarUnderlineStyle={styles.lineStyle}
            tabBarActiveTextColor='#06C1AE'>

            <OrderItemView style={styles.textStyle} tabLabel='全部' {...this.props}/>
            <OrderItemView style={styles.textStyle} tabLabel='待付款' {...this.props}/>
            <OrderItemView style={styles.textStyle} tabLabel='待使用' {...this.props}/>
            <OrderItemView style={styles.textStyle} tabLabel='待评价' {...this.props}/>
            <OrderItemView style={styles.textStyle} tabLabel='退款/售后' {...this.props}/>
          </ScrollableTabView>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flexStyle: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  lineStyle: {
    width: width / 5,
    height: 2,
    backgroundColor: '#06C1AE',
  },
  textStyle: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
  },

});

