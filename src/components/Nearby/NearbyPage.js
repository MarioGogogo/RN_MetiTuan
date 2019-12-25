/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow 附近
 */
import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  Image,
  View, StatusBar
} from 'react-native'
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import { Paragraph } from '../../common/Text'
import NearbyListScene from './NearbyListScene'
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
const { width } = Dimensions.get('window');
const isIOS = Platform.OS == "ios"

export  default  class NearbyPage extends Component{
  state={}

  renderHeadView= ()=>{
      return (
        <View style={styles.headStyle}>
          <TouchableOpacity style={styles.addressStyle}>
            <FontAwesome
              name={'map-marker'}
              style={styles.searchIcon}
              size={20}
              color={"#06C1AE"}
            />
            <Text style={styles.headText}>杭州市</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.searchBar}>
            <Image source={require('../../images/ic_search.png')} style={styles.searchIcon} />
            <Paragraph>找附近的吃喝玩乐</Paragraph>
          </TouchableOpacity>

        </View>
      )
  }
  render() {
    let titles = ['享美食', '住酒店', '爱玩乐', '全部']
    let types = [
      ['热门', '面包甜点', '小吃快餐', '川菜', '日本料理', '韩国料理', '台湾菜', '东北菜'],
      ['热门', '商务出行', '公寓民宿', '情侣专享', '高星特惠', '成人情趣'],
      ['热门', 'KTV', '足疗按摩', '洗浴汗蒸', '大宝剑', '电影院', '美发', '美甲'],
      []
    ]

    let storyListViews = [];
    for (let i = 0; i < titles.length; i++) {
      let storyListView = <NearbyListScene
        {...this.props}
        tabLabel={titles[i]}
        key={i}
        types={types[i]} />
      storyListViews.push(storyListView)
    }

    return (
      <View style={styles.flexStyle}>
        <StatusBar
          animated={true} //指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden
          hidden={false}  //是否隐藏状态栏。
          backgroundColor={'red'} //状态栏的背景色
          translucent={true}//指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。
          barStyle={'dark-content'} // enum('default', 'light-content', 'dark-content')
          />
          {/*头部搜索*/}
          {this.renderHeadView()}
          {/*tab页*/}
        <ScrollableTabView
          style={styles.container}
          tabBarBackgroundColor='white'
          tabBarActiveTextColor='#06C1AE'
          tabBarInactiveTextColor='#06C1AE'
          tabBarTextStyle={styles.tabBarText}
          tabBarUnderlineStyle={styles.tabBarUnderline}
        >
          {storyListViews}
        </ScrollableTabView>
       </View>
    );
  }
}

const styles = StyleSheet.create({
  flexStyle: {
    flex: 1,
    width:width,
    alignItems: 'center',
    marginTop:20
  },
  headStyle: {
    width:width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft:15,
    paddingRight:15
  },
  addressStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: isIOS ? 25 : 13,
  },
  searchBar: {
    width: width * 0.65,
    height: 30,
    borderRadius: 19,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    alignSelf: 'flex-end',
    marginTop: isIOS ? 25 : 13,
    marginRight: 20,
  },
  searchIcon: {
    width: 20,
    height: 20,
    margin: 5,
  },
  headText: {
    fontSize: 14,
    marginLeft:5,
    marginRight:5,
    color: '#222222',
  },
  tabBarText: {
    fontSize: 14,
    marginTop: 13,
  },
  tabBarUnderline: {
    backgroundColor: '#06C1AE',
    height: 2,
  },

});