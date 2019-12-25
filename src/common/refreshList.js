//
//  Created by Liu Jinyong on 17/4/5.
//  Copyright © 2016年 Liu Jinyong. All rights reserved.
//
//  @flow
//  Github:
//  https://github.com/huanxsd/react-native-refresh-list-view

import React, {PureComponent} from 'react'
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ViewPropTypes
} from 'react-native'

export const RefreshState = {
  Idle: 0,
  HeaderRefreshing: 1,
  FooterRefreshing: 2,
  NoMoreData: 3,
  Failure: 4,
  EmptyData: 5,
}


const DEBUG = false

// const log = (text: string) => {DEBUG && console.log(text)}


class RefreshListView extends PureComponent {
  constructor(props) {
    super(props)
    this.canLoadMore = true
  }

  static defaultProps = {
    footerRefreshingText: '数据加载中…',
    footerFailureText: '点击重新加载',
    footerNoMoreDataText: '已加载全部数据',
    footerEmptyDataText: '暂时没有相关数据',
  }

  componentWillReceiveProps(nextProps) {
    // console.log('[RefreshListView]  RefreshListView componentWillReceiveProps ',nextProps)
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('[RefreshListView]  RefreshListView componentDidUpdate ' + prevProps)
  }

  onHeaderRefresh = () => {
    console.log('[RefreshListView]  onHeaderRefresh')
    console.log('this.shouldStartHeaderRefreshing()', this.shouldStartHeaderRefreshing())
    if (this.shouldStartHeaderRefreshing()) {
      console.log('[RefreshListView]  onHeaderRefresh')
      this.props.onHeaderRefresh(RefreshState.HeaderRefreshing)
    }
  }

  onEndReached = (info) => {
    console.log('info', info)
    // log('[RefreshListView]  onEndReached   ' + info.distanceFromEnd)

    if (this.shouldStartFooterRefreshing()) {
      console.log('[RefreshListView]  onFooterRefresh')
      this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing)
    }
  }

  shouldStartHeaderRefreshing = () => {
    console.log('[RefreshListView]  shouldStartHeaderRefreshing')

    if (this.props.refreshState == RefreshState.HeaderRefreshing ||
      this.props.refreshState == RefreshState.FooterRefreshing) {
      return false
    }

    return true
  }

  shouldStartFooterRefreshing = () => {
    console.log('[RefreshListView]  shouldStartFooterRefreshing')

    let {refreshState, data} = this.props
    if (data.length == 0) {
      return false
    }
    return (refreshState == RefreshState.Idle)
  }

  render() {
    console.log('[RefreshListView]  render  refreshState:' + this.props)

    let {renderItem, ...rest} = this.props
    return (
      <FlatList
        ref={this.props.listRef}
        onRefresh={this.onHeaderRefresh}
        refreshing={this.props.refreshState == RefreshState.HeaderRefreshing}
        ListHeaderComponent = {this.props.ListHeaderComponent}
        ListFooterComponent={this.renderFooter}
        onEndReached={() => {
          console.log('---onEndReached----');
          setTimeout(() => {
            if (this.canLoadMore) {//fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
              this.onEndReached();
              this.canLoadMore = false;
            }
          }, 100);
        }}
        onEndReachedThreshold={0.1}
        onMomentumScrollBegin={() => {
          this.canLoadMore = true; //fix 初始化时页调用onEndReached的问题
          console.log('---onMomentumScrollBegin-----')
        }}
        renderItem={renderItem}
        {...rest}
      />
    )
  }

  renderFooter = () => {
    let footer = null

    let {
      footerRefreshingText,
      footerFailureText,
      footerNoMoreDataText,
      footerEmptyDataText,

      footerRefreshingComponent,
      footerFailureComponent,
      footerNoMoreDataComponent,
      footerEmptyDataComponent,
    } = this.props

    switch (this.props.refreshState) {
      case RefreshState.Idle:
        footer = (<View style={styles.footerContainer}/>)
        break
      case RefreshState.Failure: {
        footer = (
          <TouchableOpacity onPress={() => {
            if (this.props.data.length == 0) {
              this.props.onHeaderRefresh && this.props.onHeaderRefresh(RefreshState.HeaderRefreshing)
            } else {
              this.props.onFooterRefresh && this.props.onFooterRefresh(RefreshState.FooterRefreshing)
            }
          }}
          >
            {footerFailureComponent ? footerFailureComponent : (
              <View style={styles.footerContainer}>
                <Text style={styles.footerText}>{footerFailureText}</Text>
              </View>
            )}
          </TouchableOpacity>
        )
        break
      }
      case RefreshState.EmptyData: {
        footer = (
          <TouchableOpacity onPress={() => {
            this.props.onHeaderRefresh && this.props.onHeaderRefresh(RefreshState.HeaderRefreshing)
          }}
          >
            {footerEmptyDataComponent ? footerEmptyDataComponent : (
              <View style={styles.footerContainer}>
                <Text style={styles.footerText}>{footerEmptyDataText}</Text>
                {/* <Image style={styles.emptyIcon} source={require('../../res/img/common/nolist.png')}/> */}
              </View>
            )}
          </TouchableOpacity>
        )
        break
      }
      case RefreshState.FooterRefreshing: {
        footer = footerRefreshingComponent ? footerRefreshingComponent : (
          <View style={styles.footerContainer}>
            <ActivityIndicator size="small" color="#888888"/>
            <Text style={[styles.footerText, {marginLeft: 7}]}>{footerRefreshingText}</Text>
          </View>
        )
        break
      }
      case RefreshState.NoMoreData: {
        footer = footerNoMoreDataComponent ? footerNoMoreDataComponent : (
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>{footerNoMoreDataText}</Text>
          </View>
        )
        break
      }
    }
    return footer
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 44,
  },
  footerText: {
    fontSize: 14,
    color: '#555555'
  },
  emptyIcon:{
    marginTop: "45%"
  }
})

export default RefreshListView
