import React, { Component } from "react";

import { StackNavigator } from "react-navigation";

import Login from './screens/Login';
import DashBoard from './screens/Dashboard';

const App = StackNavigator({
    Login: { screen: Login },
    Dashboard: { screen: DashBoard }
});

export default App;