import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LandingScreen, MainFeed, LogIn, SignUp, Loading } from './components/screens';
import { CreateRecipe } from './components/container';
import { Logo, RecipeDescription, RecipeIngredients, RecipeInstructions } from './components/presentation';
import { createSwitchNavigator, createBottomTabNavigator, createStackNavigator} from 'react-navigation';

const IntroStack = createSwitchNavigator({
  landpage: LandingScreen,
  login: LogIn,
  signup: SignUp,
})

const RecipeTabs = createBottomTabNavigator({
  description: RecipeDescription,
  ingredients: RecipeIngredients,
  instructions: RecipeInstructions,
},
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'description') {
        iconName = `description${focused ? '' : '-outline'}`;
      } else if (routeName === 'ingredients') {
        iconName = `ingredients${focused ? '' : '-outline'}`;
      } else if (routeName === 'instructions') {
        iconName = `instructions${focused ? '' : '-outline'}`;
      }

      // You can return any component that you like here! We usually use an
      // icon component from react-native-vector-icons
    },
  }),
  tabBarOptions: {
    activeTintColor: 'rgb(57, 181, 174)',
    activeBackgroundColor: 'rgb(242, 252, 252)',
    inactiveTintColor: 'rgb(0, 0, 0)',
  },
})

const FeedStack = createStackNavigator({
  mainfeed: MainFeed,
  createrecipe: CreateRecipe,
  recipepage: RecipeTabs
},
{
  navigationOptions: {
    headerTitle: <Logo />,
  }
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
