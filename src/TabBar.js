
import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView, StatusBar
} from 'react-native'
import TabNavigator from 'react-native-tab-navigator'
import  HomePage from '../src/components/Home/HomePage'
import NearbyPage from  '../src/components/Nearby/NearbyPage'
import MinePage from "./components/Mine/MinePage"
import OrderPage from "./components/Order/OrderPage"

import { inject, observer } from 'mobx-react';


//默认选项
const TAB_HOME_NORMAL = require('./images/tabbar_homepage.png');
const TAB_NEARBY_NORMAL = require('./images/tabbar_nearby.png');
const TAB_DISCOVER_NORMAL = require('./images/tabbar_discover.png');
const TAB_ORDER_NORMAL = require('./images/tabbar_order.png');
const TAB_MINE_NORMAL = require('./images/tabbar_mine.png');
//选中
const TAB_HOME_PRESS = require('./images/tabbar_homepage_selected.png');
const TAB_NEARBY_PRESS = require('./images/tabbar_nearby_selected.png');
const TAB_DISCOVER_PRESS = require('./images/tabbar_discover_selected.png');
const TAB_ORDER_PRESS = require('./images/tabbar_order_selected.png');
const TAB_MINE_PRESS = require('./images/tabbar_mine_selected.png');


@inject('loginStore')
@observer
export default class MainPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 'Home'
    }
  }
  onPress(tabName) {
    console.log(tabName)
    if (tabName) {
      this.setState({
          selectedTab: tabName,
        }
      );
    }
  }
  renderTabView = (title,tabName,defaultTab,isBadge)=>{
     let tabNomal,tabPress,tabPage;
     switch (tabName) {
       case 'Home':
         tabNomal = TAB_HOME_NORMAL;
         tabPress = TAB_HOME_PRESS;
         tabPage = <HomePage {...this.props}/>;
         break;
       case 'Nearby':
         tabNomal = TAB_NEARBY_NORMAL;
         tabPress = TAB_NEARBY_PRESS;
         tabPage = <NearbyPage {...this.props}/>;
         break;
       case 'Discover':
         tabNomal = TAB_DISCOVER_NORMAL;
         tabPress = TAB_DISCOVER_PRESS;
         tabPage = <HomePage />;
         break;
       case 'Order':
         tabNomal = TAB_ORDER_NORMAL;
         tabPress = TAB_ORDER_PRESS;
         tabPage = <OrderPage {...this.props}/>;
         break;
       case 'Mine':
         tabNomal = TAB_MINE_NORMAL;
         tabPress = TAB_MINE_PRESS;
         tabPage = <MinePage {...this.props}/>;
         break;
       default:
     }
     return (
       <TabNavigator.Item
         //设置选中的位置
         selected={this.state.selectedTab === tabName}
         //标题
         title= {title}
         //标题样式
         titleStyle={styles.tabText}

         badgeText={''}
         //选中时标题文字样式
         selectedTitleStyle={styles.selectedTabText}
         //图标
         renderIcon={() => <Image style={styles.icon} source={tabNomal} />}
         //选中时图标
         renderSelectedIcon={() => <Image style={styles.icon} source={tabPress} />}
         //点击Event
         onPress={() => this.onPress(tabName)}
         >
         <View style={styles.page}>
           {tabPage}
         </View>
       </TabNavigator.Item>
     )
  }

  render() {
    const {loginStore} = this.props
    return (
        <TabNavigator style={styles.tabStyle}>
          {this.renderTabView('首页','Home',HomePage,false)}
          {this.renderTabView('附近', 'Nearby', NearbyPage, false)}
          {this.renderTabView('逛一逛', 'Discover', MinePage, false)}
          {this.renderTabView('订单', 'Order', OrderPage, false)}
          {this.renderTabView('我的', 'Mine', MinePage, false)}
        </TabNavigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 10,
    color: 'black'
  },
  selectedTabText: {
    fontSize: 10,
    color: 'green'
  },
  icon: {
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  }
});