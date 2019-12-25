import React,{Component} from 'react'
import {StyleSheet,View,Text,Image} from 'react-native'
import RefreshListView,{RefreshState}  from '../../common/refreshList'
import NearbyHeaderView from './NearbyHeaderView'
import NearbyCell from './NearbyCell'

import api from '../../config/mock'

export  default  class NearbyListScene extends Component {

  constructor(props: Object) {
    super(props)

    this.state = {
      typeIndex: 0,
      data: [],
      refreshState: RefreshState.Idle,
    }
  }

  componentDidMount() {
    console.log('请求-------requestFirstPage')
    this.requestFirstPage()
  }

  requestData =  () => {
    let json = api.recommend

    console.log(JSON.stringify(json))

    let dataList = json.data.map((info) => {
      return {
        id: info.id,
        imageUrl: info.squareimgurl,
        title: info.mname,
        subtitle: `[${info.range}]${info.title}`,
        price: info.price
      }
    })

    // 偷懒，用同一个测试接口获取数据，然后打乱数组，造成数据来自不同接口的假象 >.<
    dataList.sort(() => { return 0.5 - Math.random() })

    return dataList
  }

  requestFirstPage = async () => {
    try {
      this.setState({ refreshState: RefreshState.HeaderRefreshing })
      let dataList = await this.requestData()
      this.setState({
        data: dataList,
        refreshState: RefreshState.Idle,
      })
    } catch (error) {
      this.setState({
        refreshState: RefreshState.Failure,
      })
    }
  }

  requestNextPage = async () => {
    try {
      this.setState({ refreshState: RefreshState.FooterRefreshing })
      let dataList = await this.requestData()

      this.setState({
        data: [...this.state.data, ...dataList],
        //假设数据大于30结束刷新
        refreshState: this.state.data.length > 30 ? RefreshState.NoMoreData : RefreshState.Idle,
      })
    } catch (error) {
      this.setState({
        refreshState: RefreshState.Failure,
      })
    }
  }

  /**
   * 头部首页信息
   * @returns {*}
   */
  renderHeader = () => {
    return (
      <NearbyHeaderView
        titles={this.props.types}
        selectedIndex={this.state.typeIndex}
        onSelected={(index) => {
          if (index !== this.state.typeIndex) {
            this.setState({ typeIndex: index })
            this.requestData()
          }
        }}
      />
    )
  }

  renderCell = (rowData: any) => {
    return (
      <NearbyCell
        info={rowData.item}
        onPress={() => {
          alert('跳入详情')
          // this.props.navigation.navigate('GroupPurchase', { info: rowData.item })
        }}
      />
    )
  }

  render() {
    return (
      <RefreshListView
        data={this.state.data}
        ListHeaderComponent={this.renderHeader}
        renderItem={this.renderCell}
        keyExtractor={(item, index) => index.toString()}
        refreshState={this.state.refreshState}
        onHeaderRefresh={this.requestFirstPage}
        onFooterRefresh={this.requestNextPage}
      />
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})