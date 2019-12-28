/**
 * https://github.com/facebook/react-native
 * @flow 分类
 */

import React, {Component} from 'react'
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Animated,
  Platform,
  Image,
  ImageBackground,
  TouchableOpacity,
  findNodeHandle
} from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
// import Parabolic from '../util/Parabolic'

import {scaleWidth, scaleHeight} from '../../util/ScreenUtil'
import data from '../../config/data'
import NavigationBar from '../../common/NavigationBar'
import {Actions} from "react-native-router-flux"
import GoodsList from './GoodsList'
import Comments from './Comments'
import ShopBar from './ShopBar'
import Merchant from './Merchant'

let {width, height} = Dimensions.get('window')
let topbarHeight = (Platform.OS === 'ios' ? 64 : 42)


export default class ClassifyPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTab:0,
      scrollY: 0,
      titleOpacity: 0,
      activeOpacity: 1,
      headOpacity: 1,
      addBtnY: -9999,
      animateBtnX: 0,
      animateBtnY: 0,
      runBtn: new Animated.Value(0),
      selected: [],
      lens: {},
      bgY: 0,
      bgScale: 1,
      viewRef: 0,
      b: {},
      goods: data.goods,
      data: {
        name: "田老师红烧肉（马戏城店）",
        isBrand: true,
        logo: 27,
        scores: 3.5,
        sale: 4013,
        bao: true,
        piao: true,
        ontime: true,
        fengniao: true,
        startPay: "￥20起送",
        deliverPay: "配送费￥4",
        evOnePay: "￥21/人",
        journey: "250m",
        time: "35分钟",
        bulletin: "公告：春节前，配送紧张，可能延时推送，请客户谅解",
        activities: [
          {key: "减", text: "满20减2，满30减3，满40减4（不与美食活动同享）"},
          {key: "特", text: "双人餐特惠"}
        ]
      }
    }
  }


  imageLoaded = () => {
    this.setState({viewRef: findNodeHandle(this.refs.backgroundImage)})
  }

  //返回
  onBackPress() {
    Actions.pop()
  }
  onAdd=(data)=> {
    let {pos} = data
    this.setState({
      addBtnY: data.y
    })
    // this.refs["parabolic"].run(pos, data)
  }

  minusItem=(obj)=>{
    console.log(obj)
  }

  renderActivities() {
    let color = {
      "减": "#f07373",
      "特": "#f1884f",
      "新": "#73f08e"
    }
    let {activities} = this.state.data
    if (!activities || !activities.length) {
      return null
    } else {
      return (
        <Animated.View style={[styles.actives, {opacity: this.state.activeOpacity}]}>
          {
            activities.map((item, i) => {
              return (
                <View key={i} style={{flexDirection: "row", alignItems: "center", height: scaleWidth(18)}}>
                  <Text style={{
                    fontSize: scaleWidth(11),
                    color: "#fff",
                    backgroundColor: color[item.key] || "#f1884f",
                    paddingHorizontal: 1,
                    paddingVertical: 1
                  }}>{item.key}</Text>
                  <Text numberOfLines={1}
                        style={{fontSize: scaleWidth(11), marginLeft: 3, color: "#fff"}}>{item.text}</Text>
                </View>
              )
            })
          }
        </Animated.View>
      )
    }
  }




  renderGoods = () => {
    let marginTop = 18 + scaleWidth(80 + this.state.data.activities.length * 18)
    let MAIN_HEIGHT = height - topbarHeight
    let CONTENT_HEIGHT = MAIN_HEIGHT - marginTop
    let style = {
      transform: [{
        translateY: this.state.scrollY
      }]
    }
    if (Platform.OS === "android") {
      style.height = height + 80
    }

    return (
      <Animated.View style={[styles.topView, style]}>
        <View style={{
          backgroundColor: "#f3f3f3",
          height: MAIN_HEIGHT,
          width,
          marginTop
        }}>
          <ScrollableTabView page={this.state.currentTab}
                             tabBarBackgroundColor='white'
                             tabBarActiveTextColor='#06C1AE'
                             tabBarInactiveTextColor='#06C1AE'
                             tabBarUnderlineStyle={styles.tabviewStyle}
                             onChangeTab={obj=>{
                               this.setState({
                                  currentTab: obj.i
                               })
                               console.log(obj)
                             }}
          >
            <GoodsList ref="goodsList"
                       minus={this.minusItem}
                       lens={this.state.lens}
                       goods={this.state.goods}
                       onAdd={this.onAdd}
                       headHeight={marginTop}
                       tabLabel="商品"/>
            <Comments headHeight={marginTop} tabLabel="评价(4.1分)"/>
            <Merchant headHeight={marginTop} tabLabel="商家"/>
          </ScrollableTabView>
        </View>
      </Animated.View>
    )
  }

  getLeftBlackButton = (callBack) => {
    return <TouchableOpacity
      style={{padding: 8}}
      onPress={callBack}>
      <Image
        style={{width: 26, height: 26,}}
        source={require('../../images/ic_back_white.png')}/>
    </TouchableOpacity>
  }

  render() {
    let {data} = this.state
    let props = Platform.OS === 'ios' ? {
      blurType: "light",
      blurAmount: 25
    } : {
      viewRef: this.state.viewRef,
      downsampleFactor: 10,
      overlayColor: 'rgba(255,255,255,.1)'
    }
    return (
      <View style={{flex: 1, backgroundColor: "#f3f3f3"}}>
        <ImageBackground
          source={require('../../images/gsmh_bg.jpg')}
          ref={el => this.backgroundImage = el}
          onLoadEnd={this.imageLoaded}
          style={[styles.bg, {
            transform: [{translateY: this.state.bgY},
              {scale: this.state.bgScale}]
          }]}>
        </ImageBackground>
        <View style={styles.head}>
          <Animated.View
            style={{flexDirection: "row", paddingHorizontal: 16, opacity: this.state.headOpacity}}>
            <Image source={require('../../images/categer_bg.jpg')} style={styles.logo}/>
            <View style={{marginLeft: 14, flex: 1}}>
              <Text style={{color: "#fff"}}>{data.name}</Text>
              <TouchableOpacity>
                <View style={{flexDirection: "row", paddingTop: 8, paddingBottom: 18}}>
                  {data.fengniao ? (
                    <Text style={[styles.label2, {marginRight: 5}]}>{"达达配送"}</Text>) : null}
                  <Text style={{color: "#fff", fontSize: scaleWidth(12)}}>{`${data.time}分钟送达`}</Text>
                </View>
              </TouchableOpacity>
              <Text style={{color: "#fff", fontSize: scaleWidth(12)}} numberOfLines={1}>{data.bulletin}</Text>
            </View>
          </Animated.View>
          {this.renderActivities()}
          <NavigationBar
            navigator={this.props.navigator}
            popEnabled={false}
            style={{backgroundColor: "transparent", position: "absolute", top: 0, width}}
            leftButton={this.getLeftBlackButton(() => this.onBackPress())}
          />
        </View>
        {this.renderGoods()}
        {/*底部*/}
        {
           this.state.currentTab === 0 && <ShopBar ref={"shopbar"} list={this.state.selected} lens={this.state.lens}/>
        }
      </View>
    )
  }
}
const styles = StyleSheet.create({
  head: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    paddingTop: topbarHeight,
    backgroundColor: "rgba(0,0,0,.3)"
  },
  bg: {
    width,
    height: 230,
    resizeMode: "cover"
  },
  blur: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    width: width,
    height: 230,
  },
  logo: {
    width: scaleWidth(80),
    height: scaleWidth(80),
    resizeMode: "cover"
  },
  label2: {
    fontSize: 10,
    color: "#fff",
    backgroundColor: "#06C1AE",
    textAlign: "center",
    paddingHorizontal: 2,
    paddingVertical: 2
  },
  tabviewStyle: {
    backgroundColor: '#06C1AE',
    height: 2,
  },
  actives: {
    paddingTop: 4,
    marginTop: 8,
    paddingHorizontal: 16
  },
  topView: {
    position: "absolute",
    top: topbarHeight,
    bottom: 0,
    left: 0,
    right: 0
  },
  tmpBtn: {
    backgroundColor: "transparent",
    position: "absolute",
    right: 4,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  }
})
