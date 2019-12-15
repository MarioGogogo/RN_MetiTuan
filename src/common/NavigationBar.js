/**
 * NavigationBar
 * @flow  头部导航
 */
import React, {Component} from 'react';

import {
  StyleSheet,
  Platform,
  TouchableOpacity,
  StatusBar,
  Text,
  View
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';

import {Actions, Scene, Router} from 'react-native-router-flux'


const NAV_BAR_HEIGHT_IOS = 40;
const NAV_BAR_HEIGHT_ANDROID = 50;
const STATUS_BAR_HEIGHT = 20;

// 默认按钮不显示

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
    super(props);
    this.state = {
      title: '',
      popEnabled: true,
      hide: false
    };
  }


  getButtonElement(data = {}, style) {
    return (
      <View style={styles.navBarButton}>
        {
          data.leftButton ? (
              <NavBarButton
                  title={data.title}
                  style={[data.style, style,]}
                  tintColor={data.tintColor}
                  handler={data.handler}/>
          ):null
        }




      </View>
    );
  }

  render() {
    //手机状态栏
    let statusBar = !this.props.statusBar.hidden ?
      <View style={styles.statusBar}>
        <StatusBar {...this.props.statusBar}  style={styles.statusBar}/>
      </View> : null;
      // 导航文字显示
    let titleView = this.props.titleView
      ? this.props.titleView :
      <Text style={[styles.title, {color: this.props.titleColor}]}
            ellipsizeMode="head"
            numberOfLines={1}>
        {this.props.title}
      </Text>;

    let content = this.props.hide ? null :
      <View style={styles.navBar}>
        {/*左侧按钮*/}
        {this.getButtonElement(this.props)}
        <View style={[styles.navBarTitleContainer, this.props.titleLayoutStyle]}>
          {titleView}
        </View>
        {/*右侧按钮*/}
        {this.getButtonElement(this.props.rightButton, {marginRight: 8,})}
      </View>;
    return (
      <View style={[styles.container, this.props.style]}>
        {/*{statusBar}*/}
        {/*导航内容区域*/}
        {content}
      </View>
    )
  }
}

class NavBarButton extends Component {

  goBack=()=>{
    Actions.pop()
  }

  render() {
    const {style, tintColor, margin, title, handler} = this.props;

    return (
      <TouchableOpacity style={styles.navBarButton} onPress={handler? handler : this.goBack}>
        <View style={style}>
          <FontAwesome
              name={'chevron-left'}
              size={20}
              color={"#06C1AE"}
          />
          {/*<Text style={[styles.title, {color: tintColor,},]}>{title}</Text>*/}
        </View>
      </TouchableOpacity>
    );
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
    backgroundColor:'red'
  },
});
