import React, {Component} from 'react';

import {Scene, Router} from 'react-native-router-flux'
import LoginPage from "./src/components/Mine/LoginPage";
import MainPage from "./src/TabBar";
import SplashView from './src/common/SplashView'
import NearbyPage from './src/components/Nearby/NearbyPage'
import MinePage from './src/components/Mine/MinePage'
import SettingPage from './src/components/Mine/SettingPage'
import UserInfoPage from "./src/components/Mine/UserinfoPage"
import PasswordLoginView from "./src/components/Mine/PasswordLoginView"
import AboutPage from "./src/components/Mine/AboutPage"
import AddressPage from "./src/components/Mine/AddressPage"
import DetailPage from './src/components/Detail/DetailPage'



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
          component={LoginPage} title="Login"/>
        <Scene key="nearby"  hideNavBar component={NearbyPage} title="Nearby"/>
        <Scene key="mine" hideNavBar component={MinePage} title="Mine"/>
        <Scene key="setting"  hideNavBar component={SettingPage} title="Setting"/>
        <Scene key="userInfo"  hideNavBar component={UserInfoPage} title="UserInfo"/>
        <Scene key="findBackPassword"  hideNavBar component={PasswordLoginView} title="FindBackPassword"/>
        <Scene key="about"  hideNavBar component={AboutPage} title="About"/>
        <Scene key="address"  hideNavBar component={AddressPage} title="Address"/>
        <Scene key="detail"  hideNavBar component={DetailPage} title="Detail"/>
        {/*<Scene key="order"    hideNavBar component={Order} title="Order"/>*/}
        {/*<Scene key="colorTheme" hideNavBar component={ColorTheme} title="ColorTheme"/>*/}
      </Scene>
      {/* Loading和Toash全局加载 */}

    </Router>)
  }
}



export default App
