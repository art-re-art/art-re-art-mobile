import React from "react";

import { TouchableOpacity, View, Image } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";
import { AntDesign } from "@expo/vector-icons";

import ScannerScreen from "../screens/ScannerScreen";
import FAQScreen from "../screens/FAQScreen";

import BottomTabNavigator from "../navigation/BottomTabNavigator";

const StackNavigator = createStackNavigator(
  {
    Main: {
      screen: BottomTabNavigator,
      navigationOptions: ({ navigation }) => ({
        headerRight: (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Scanner")}
              style={{ marginRight: 20 }}
            >
              <AntDesign name="qrcode" size={25} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("FAQ")}
              style={{ marginRight: 20 }}
            >
              <AntDesign name="questioncircleo" size={25} color="white" />
            </TouchableOpacity>
          </View>
        )
      })
    },
    Scanner: {
      screen: ScannerScreen
    },
    FAQ: {
      screen: FAQScreen
    }
  },
  {
    headerLayoutPreset: "center",
    defaultNavigationOptions: {
      headerTitle: (
        <Image
          source={require("../assets/images/art-re-art-logo.png")}
          style={{
            width: 100,
            height: 100,
            position: "absolute"
          }}
        />
      ),
      headerStyle: {
        backgroundColor: "black"
      },
      headerBackTitleStyle: {
        color: "white"
      },
      headerBackImage: <AntDesign name="left" size={25} color="white" />
    }
  }
);

const AppContainer = createAppContainer(StackNavigator);

export default AppContainer;
