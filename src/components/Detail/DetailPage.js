/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {Component} from 'react'
import {
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  ScrollView,
  TouchableHighlight,
  View
} from 'react-native'
import SpacingView from '../../common/SpacingView'
import {Text16, Text14, Paragraph, HeadingBig} from '../../common/Text'
import Separator from '../../common/Separator'
import NavigationBar from '../../common/NavigationBar'
import ShareAlertDialog from '../../common/ShareAlertDialog'
// import ViewUtils from '../util/ViewUtils'

const {width, height} = Dimensions.get('window')
import {scaleWidth, scaleHeight} from '../../util/ScreenUtil'
import {Actions} from "react-native-router-flux"

const dialogH = 110

export default class DetailPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showSharePop: false,//分享弹窗
      canGoBack: false,
      headOpacity: 1
    }
  }

  onBackPress(e) {
    this.props.navigator.pop()
  }

  onSharePress() {
    this.setState({showSharePop: !this.state.showSharePop})
  }

  _closeModal = (show) => {
    this.setState(
      {showSharePop: show}
    )
  }

  renderHeadView() {
    return (
      <View>
        <View style={styles.topContainer}>
          <Text16 style={{color: '#06C1AE'}}>￥</Text16>
          <HeadingBig style={{marginBottom: -8}}>38.5</HeadingBig>
          <Paragraph style={{marginLeft: 10}}>门市价：￥{(38.5 * 1.1).toFixed(0)}</Paragraph>
          <View style={{flex: 1}}/>

          <View style={styles.styleSubmit}>
            <Text style={styles.submit}>
              立即抢购
            </Text>
          </View>
        </View>
        <Separator/>
        <View style={styles.tagContainer}>
          <Image style={{width: 20, height: 20}}
                 source={require('../../images/icon_deal_anytime_refund.png')}/>
          <Paragraph style={{color: '#89B24F'}}> 随时退</Paragraph>
          <View style={{flex: 1}}/>
          <Paragraph>已售{1234}</Paragraph>
        </View>
      </View>
    )
  }

  renderScoreView() {
    return (
      <View style={styles.scores}>
        <Image source={require('../../images/ic_star2.png')} style={{height: 12, width: 60}}/>
        <View style={{flex: 1}}/>
        <Paragraph style={{color: '#999999'}}>暂无评分</Paragraph>
      </View>
    )
  }

  renderBusinessInfoView() {
    return (
      <View style={styles.businessInfo}>
        <Paragraph style={{paddingBottom: 15}}>商家信息</Paragraph>
        <Separator/>
        <Text14 style={{color: '#000000', paddingTop: 15, paddingBottom: 10}}>真功夫(人民广场旗舰店)</Text14>
        <Paragraph>金陵东路xx号</Paragraph>
      </View>
    )
  }

  renderNoticeView() {
    return (
      <View style={styles.businessInfo}>
        <Paragraph style={{paddingBottom: 15}}>购需须知</Paragraph>
        <Separator/>
        <Paragraph style={{color: '#ff6000', paddingTop: 15, paddingBottom: 10}}>有效期：</Paragraph>
        <Text14 style={{color: '#000000'}}>2017.6.15至2017.10.15</Text14>
        <Paragraph style={{color: '#ff6000', paddingTop: 15, paddingBottom: 10}}>使用时间：</Paragraph>
        <Text14 style={{color: '#000000'}}>10：00-22：00</Text14>
        <Paragraph style={{color: '#ff6000', paddingTop: 15, paddingBottom: 10}}>使用规则：</Paragraph>
        <Text14 style={{color: '#000000'}}>.请提前两天预定</Text14>
        <Text14>.每天最多使用10张优惠券</Text14>
        <Text14>.提供WIFI</Text14>
      </View>
    )
  }


  getShareButton = (callBack)=>(
    <TouchableHighlight
      ref='moreMenuButton'
      underlayColor='transparent'
      style={{padding: 5}}
      onPress={callBack}>
      <View style={{paddingRight: 8}}>
        <Image
          style={{width: 24, height: 24, marginLeft: 5}}
          source={require('../../images/icon_share_white.png')}
        />
      </View>
    </TouchableHighlight>
  )

  getLeftButton =(callback)=> (
    <TouchableHighlight
      style={{padding: 8}}
      onPress={callback}>
      <Image
        style={{width: 26, height: 26,}}
        source={require('../../images/ic_back_white.png')}/>
    </TouchableHighlight>
  )


  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Animated.View
            style={{flexDirection: "row", opacity: this.state.headOpacity}}>
            <Image source={require('../../images/ic_detail.png')} style={styles.imageStyle}/>
          </Animated.View>

          <NavigationBar
            navigator={this.props.navigator}
            popEnabled={false}
            style={{backgroundColor: "transparent", position: "absolute", top: 0, width}}
            leftButton={this.getLeftButton(() => Actions.pop())}
            rightButton={this.getShareButton(() => this.onSharePress())}
          />

          {this.renderHeadView()}
          <SpacingView/>
          {this.renderScoreView()}
          <SpacingView/>
          {this.renderBusinessInfoView()}
          <SpacingView/>
          {this.renderNoticeView()}
          <SpacingView/>

          <View style={styles.tipHeader}>
            <Text14>看了本团购的用户还看了</Text14>
          </View>
        </ScrollView>

        <ShareAlertDialog
          show={this.state.showSharePop}
          closeModal={this._closeModal}
          {...this.props}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  banner: {
    width: width,
    height: width * 0.5
  },
  topContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  imageStyle: {
    width: width,
    height: scaleHeight(220),
    resizeMode: "cover"
  },
  buyButton: {
    backgroundColor: '#fc9e28',
    width: 94,
    height: 36,
    borderRadius: 7,
  },
  tagContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center'
  },
  tipHeader: {
    height: 35,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e9e9e9',
    paddingVertical: 8,
    paddingLeft: 20,
    backgroundColor: 'white'
  },
  scores: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 38,
    paddingLeft: 15,
    paddingRight: 15
  },
  businessInfo: {
    padding: 15,
  },
  styleSubmit: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#fc9e28',
    width: 94,
    height: 36,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submit: {
    fontSize: 18,
    color: '#ffffff',
  },

})

