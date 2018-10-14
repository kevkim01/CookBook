import React , { Component } from 'react';
import allReducers from './index.js';
import { StyleSheet, View, Text, Alert } from 'react-native';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import RecipeForm from './recipeForm.js';
import { Field, reduxForm } from 'redux-form';
import store from './index';
import showResults from './showResults.js'

 export default class Test extends Component{
  render(){
    return(
      <Provider store= {store}>
        <View style={styles.container}>
          <RecipeForm onSubmit={showResults}/>
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
  },
})
