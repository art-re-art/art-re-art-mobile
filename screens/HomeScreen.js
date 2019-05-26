import React from "react";
import {
  Dimensions,
  ScrollView,
  View,
  Image,
  ActivityIndicator,
  Text,
  ImageBackground
} from "react-native";

import Event from "../components/Event";
import { TitleText } from "../components/Texts";
import fetchEvents from "../utilities/fetchEvents";

import { FadeInView } from "../components/Views";

export default class HomeScreen extends React.Component {
  state = {
    isLoading: true,
    events: null
  };

  _fetchEvents = async () => {
    this.setState({
      isLoading: true,
      events: null
    });

    let events = await fetchEvents();

    this.setState({
      isLoading: false,
      events: events
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
      <ImageBackground source={require("../assets/images/bg4.png")} style={{width: '100%', height: '100%'}}>
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
                opacity: .1,
                bottom: 0,
                top: 0,
                right: -10,
                left: "auto",
                zIndex: -1,
              }}
            />
            <Text style={{ fontFamily: "font2", fontSize: 50 }}>Hello!</Text>
          </FadeInView>
          <View
            style={{
              margin: 15
            }}
          >
            <Text
              style={{
                position: "absolute",
                color: "white",
                fontSize: 23,
                fontWeight: "bold",
                opacity: 0.3,
                top: 10,
                right: 15,
                zIndex: 2
              }}
            >
              Next Event
            </Text>
            <Event
              title={this.state.events[0].title}
              dateDay={this.state.events[0].dateDay}
              dateMonth={this.state.events[0].dateMonth}
              dateTime={this.state.events[0].dateTime}
              locationName={this.state.events[0].location.title}
              location={this.state.events[0].location.street}
              event={this.state.events[0]}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}
