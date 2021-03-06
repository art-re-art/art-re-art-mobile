import React from "react";
import {
  Dimensions,
  ScrollView,
  View,
  Image,
  ActivityIndicator,
  Text,
  ImageBackground,
  FlatList
} from "react-native";

import Event from "../components/Event";
import Artist from "../components/Artist";
import { FadeInView, TitleView } from "../components/Views";
import { api } from "../app.config";

export default class HomeScreen extends React.Component {
  state = {
    isLoading: true,
    events: null
  };

  _keyExtractor = (item, index) => item.url;

  _fetchEvents = () => {
    this.setState({
      isLoading: true,
      events: null
    });
    return fetch(api.events)
      .then(res => {
        return res.json();
      })
      .then(resJson => {
        this.setState({
          isLoading: false,
          events: resJson
        });
      })
      .catch(err => {
        console.error(err);
      });
  };

  componentDidMount() {
    return this._fetchEvents();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <ImageBackground
        source={require("../assets/images/bg4.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <ScrollView>
          <FadeInView
            style={{
              // justifyContent: "center",
              // alignItems: "center",
              margin: 15,
              marginTop: 30
            }}
          >
            <Image
              source={require("../assets/images/artreart-red-rotate.png")}
              style={{
                height: Dimensions.get("window").height - 200,
                width: 200,
                position: "absolute",
                opacity: 0.1,
                bottom: 0,
                top: 0,
                right: -10,
                left: "auto",
                zIndex: -1
              }}
            />
            <Text style={{ fontFamily: "font2", fontSize: 50 }}>Hello!</Text>
          </FadeInView>
          <TitleView title="Upcoming Event" />
          <View
            style={{
              margin: 15
            }}
          >
            <Event
              {...this.state.events[0]}
              navigation={this.props.navigation}
            />
          </View>
          <TitleView title="Upcoming Artists" />

          <FlatList
            style={{ margin: 15, marginTop: 0 }}
            keyExtractor={this._keyExtractor}
            renderItem={({ item, index }) => (
              <Artist
                {...item}
                index={index}
                navigation={this.props.navigation}
              />
            )}
            data={this.state.events[0].artists}
          />
        </ScrollView>
      </ImageBackground>
    );
  }
}
