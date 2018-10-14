import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import firebase from 'react-native-firebase';
import { Icon } from 'react-native-elements';
import { Provider } from 'react-redux';
import RecipeForm from '../reducers/recipeForm.js';
import store from '../reducers/reducer.js';
import showResults from '../reducers/showResults.js'

class CreateRecipe extends Component {
  constructor(props) {
    super(props);
    this.state={}
  }

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
  };

  render(){
    return(
      <Provider store= {store}>
        <View style={styles.container}>
          <RecipeForm onSubmit={showResults}/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgb(255, 255, 255)',
  },
});

export default CreateRecipe;
