import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';
//import { Logo, RecipeDescription, RecipeIngredients, RecipeInstructions } from '../../components/presentation';
import Logo from './Logo.js';
import RecipeDescription from './RecipeDescription.js';
import RecipeInstructions from './RecipeInstructions.js';
import RecipeIngredients from './RecipeIngredients.js';


class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: '',
      creator: '',
      category: '',
      cooktime: '',
      ingredients: [{ name: '', quantity: ''}],
      instructions: [{ step: ''}]
    }
  }

  static navigationOptions = {
    headerTitle: <Logo />,
  };

  render(){
    return(
      <View style={styles.container}>
        <RecipeTabs />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(255, 255, 255)',
  },
});

export default Recipe;
