import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Recipe } from '../presentation';
import firebase from 'react-native-firebase';


class MainFeed extends Component {
  constructor(props) {
    super(props);
    this.state={
      name: 'Pizza',
      ingredients: ['cheese', 'chicken', 'olives'],
      instructions: ['make the dough', 'make the sauce', 'bake it til its done'],
      currentUser: null
    }
  }

  componentDidMount(){
    var user = firebase.auth().currentUser;
    this.setState({
      currentUser: user
    })
  }

  signOut() {
    firebase.auth().signOut();
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
        <Text>Hi {this.state.currentUser && this.state.currentUser.email}</Text>

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

        <TouchableOpacity
          style={styles.button}
          onPress={() => {this.signOut()}}
        >
          <Text>Sign Out</Text>
        </TouchableOpacity>

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
  },
  button: {
    width:70+'%',
    padding: 7,
    marginBottom: 30,
    borderRadius: 5,
    backgroundColor:'rgb(57, 181, 174)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainFeed;
