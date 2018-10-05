import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LandingScreen, MainFeed, LogIn, SignUp, Loading } from './components/screens';
import { CreateRecipe } from './components/container';
import { Recipe } from './components/presentation';
import { createSwitchNavigator, createTabNavigator, createStackNavigator } from 'react-navigation';

const IntroStack = createSwitchNavigator({
  landpage: LandingScreen,
  login: LogIn,
  signup: SignUp,
})

const FeedStack = createStackNavigator({
  mainfeed: MainFeed,
  createrecipe: CreateRecipe,
  recipepage: Recipe
})

const MainStack = createSwitchNavigator({
  loading: Loading,
  intro: IntroStack,
  main: FeedStack,
})

class CookBook extends Component {
  render(){
    return(
      <View style={{flex:1, width: 100+'%', height: 100+'%'}}>
        <MainStack />
      </View>
    );
  }
}

export default CookBook;
