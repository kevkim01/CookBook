import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Recipe } from '../presentation';

class MainFeed extends Component {
  constructor(props) {
    super(props);
    this.state={
      name: 'Pizza',
      ingredients: ['cheese', 'chicken', 'olives'],
      instructions: ['make the dough', 'make the sauce', 'bake it til its done']
    }
  }

  render(){
    const ingredientList= this.state.ingredients.map((i)=>
      <Text key={i} style={styles.ingredients}>
        {i}
      </Text>)
    const instructionList = this.state.instructions.map((instruction)=>
      <Text key={instruction} style={styles.instructions}>
        {instruction}
      </Text>)

    return(
      <View style={styles.container}>

        <View>
          <Text style={{fontSize:20}}>{this.state.name}</Text>
        </View>

        <View>
          <Text>Ingredients</Text>
          {ingredientList}
        </View>

        <View>
          <Text>Instructions</Text>
          {instructionList}
        </View>

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
  ingredients: {
    color: 'rgb(255, 19, 19)'
  },
  instructions: {
    color: 'rgb(31, 255, 19)'
  }
});

export default MainFeed;
