import React, { Component } from "react";
import { AppRegistry, View, Text, Button } from "react-native";

import { StackNavigator } from "react-navigation";

const LoginScreen = props => (
    <View>
      <Button
          title="Log In"
          onPress={() => {
              props.navigation.navigate("Main");
          }}
      />
    </View>
);

class MainScreen extends Component {
    static navigationOptions = {
        title: "Welcome"
    };

    render() {
        return (
            <View>
              <Text>Welcome to React Navigation</Text>
            </View>
        );
    }
}

const App = StackNavigator({
    Login: { screen: LoginScreen },
    Main: { screen: MainScreen }
});

AppRegistry.registerComponent("protoNavigationRedux", () => App);
