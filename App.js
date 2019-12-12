import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Scene, Router} from 'react-native-router-flux'

import Register from './src/Register';
import Login from './src/Login';
import MainPage from "./src/TabBar";
import SplashView from './src/common/SplashView'
import NearbyPage from './src/components/Nearby/NearbyPage'
import MinePage from './src/components/Mine/MinePage'
import SettingPage from './src/components/Mine/SettingPage'
import UserInfoPage from "./src/components/Mine/UserinfoPage"
import PasswordLoginView from "./src/components/Mine/PasswordLoginView"
import AboutPage from "./src/components/Mine/AboutPage"
import AddressPage from "./src/components/Mine/AddressPage"

class App extends Component {
  render() {
    return (<Router>
      <Scene key="root">
        <Scene
          key="splashview"
          hideNavBar
          component={SplashView}
        />
      <Scene
          key="mainpage"
          hideNavBar
          component={MainPage}
        />
        <Scene
          hideNavBar
          key="login"
          component={Login} title="Login"/>
        <Scene key="nearby"  hideNavBar component={NearbyPage} title="Nearby"/>
        <Scene key="mine" hideNavBar component={MinePage} title="Mine"/>
        <Scene key="setting"  hideNavBar component={SettingPage} title="Setting"/>
        <Scene key="userInfo"  hideNavBar component={UserInfoPage} title="UserInfo"/>
        <Scene key="findBackPassword"  hideNavBar component={PasswordLoginView} title="FindBackPassword"/>
        <Scene key="about"  hideNavBar component={AboutPage} title="About"/>
        <Scene key="address"  hideNavBar component={AddressPage} title="Address"/>

        {/*<Scene key="order"    hideNavBar component={Order} title="Order"/>*/}
        {/*<Scene key="colorTheme" hideNavBar component={ColorTheme} title="ColorTheme"/>*/}
      </Scene>
      {/* Loading和Toash全局加载 */}

    </Router>)
  }
}



export default App
