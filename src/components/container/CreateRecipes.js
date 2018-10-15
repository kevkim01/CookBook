import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import firebase from 'react-native-firebase';
import { Icon } from 'react-native-elements';
import { Provider } from 'react-redux';
import RecipeForm from './recipeForm.js';
import store from '../reducers/reducer.js';

class CreateRecipes extends Component {
  static navigationOptions = {
    headerRight: (
      <TouchableOpacity
        onPress = {() => Alert.alert('button')}
        style={{paddingRight: 20}}
      >
        <Icon
          name="menu"
        />
      </TouchableOpacity>
    )
  }

  showResults(values) {
    var user = firebase.auth().currentUser;
    let key = values.recipeName + '-' + values.creator + '-' + user.uid;
    let path = 'users/' + user.uid;

    firebase.database().ref(path).child('recipeList').push({
      recipename: values.recipeName,
      creator: values.creator,
      key: key
    });

    firebase.database().ref('recipes').child(key).set({
      name: values.recipeName,
      creator: values.creator,
      category: values.category,
      cookTime: values.cookTime,
      ingredients: values.ingredients,
      instructions: values.instructions
    });
  }

  render(){
    return(
      <View style={styles.container}>
        <Provider store= {store}>
          <RecipeForm onSubmit={(values)=> this.showResults(values)}/>
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgb(255, 255, 255)',
  }
});

export default CreateRecipes;
