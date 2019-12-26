/**
 * NavigationBar
 * @flow 导航组件
 */
import React, {Component} from 'react'

import {
  StyleSheet,
  Platform,
  TouchableOpacity,
  StatusBar,
  Text,
  View
} from 'react-native'

// ios高度
const NAV_BAR_HEIGHT_IOS = 40
// Android高度
const NAV_BAR_HEIGHT_ANDROID = 50
//普通高度
const STATUS_BAR_HEIGHT = 20


export default class NavigationBar extends Component {
  static defaultProps = {
    statusBar: {
      barStyle: 'default',
      hidden: false,
      translucent: false,
      animated: false,
    },
  }

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      popEnabled: true,
      hide: false
    }
  }





  getButtonElement(data = {}, style) {
    return (
      <View style={styles.navBarButton}>
        {(!!data.props) ? data : (
          <NavBarButton
            title={data.title}
            style={[data.style, style,]}
            tintColor={data.tintColor}
            handler={data.handler}/>
        )}
      </View>
    )
  }

  render() {
    const {leftButton, rightButton, titleLayoutStyle, titleView, titleColor, title} = this.props
    let statusBar = !this.props.statusBar.hidden ?
      <View style={styles.statusBar}>
        <StatusBar {...this.props.statusBar} style={styles.statusBar}/>
      </View> : null

    let titleCount = titleView ? titleView :
      <Text
        style={[styles.title, {color: titleColor}]}
        ellipsizeMode="head"
        numberOfLines={1}
      >{title}
      </Text>
    let content = this.props.hide ? null :
      <View style={styles.navBar}>
        {/*左按钮*/}
        {this.getButtonElement(leftButton)}
        <View style={[styles.navBarTitleContainer, titleLayoutStyle]}>
          {titleCount}
        </View>
        {/*右按钮*/}
        {this.getButtonElement(rightButton, {marginRight: 8,})}
      </View>
    return (
      <View style={[styles.container, this.props.style]}>
        {statusBar}
        {content}
      </View>
    )
  }
}

class NavBarButton extends Component {
  render() {
    const {style, tintColor, margin, title, handler} = this.props

    return (
      <TouchableOpacity style={styles.navBarButton} onPress={handler}>
        <View style={style}>
          <Text style={[styles.title, {color: tintColor,},]}>{title}</Text>
        </View>
      </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#06C1AE',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
  },
  navBarTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 40,
    top: 0,
    right: 40,
    bottom: 0,
  },
  title: {
    fontSize: 18,
  },
  navBarButton: {
    alignItems: 'center',
  },
  statusBar: {
    height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,
    backgroundColor: 'transparent'
  },
})
