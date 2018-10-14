import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { LandingScreen, MainFeed, LogIn, SignUp, Loading } from './components/screens';
import { CreateRecipe } from './components/container';
import { Logo, RecipeDescription, RecipeIngredients, RecipeInstructions } from './components/presentation';
import { createSwitchNavigator, createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import { Icon } from 'react-native-elements';

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
        iconName = `description`;
      } else if (routeName === 'ingredients') {
        iconName = `kitchen`;
      } else if (routeName === 'instructions') {
        iconName = `list`;
      }
      return <Icon name={iconName} color={tintColor}/>;
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
    headerRight: (
      <View style ={{flexDirection:'row', alignItems:'center'}}>
        <TouchableOpacity
          onPress = {() => Alert.alert('edit')}
          style={{paddingRight: 7}}
        >
          <Icon
            name="edit"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress = {() => Alert.alert('menu')}
          style={{paddingRight: 20}}
        >
          <Icon
            name="menu"
          />
        </TouchableOpacity>
      </View>
    ),
    headerTintColor: 'rgb(57, 181, 174)',
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
