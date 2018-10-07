import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';
import Logo from './Logo.js';

class RecipeDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: '',
      creator: '',
      category: '',
      cooktime: ''
    }
  }

  componentDidMount(){
    var key = this.props.navigation.getParam('recipeid');
    ref = firebase.database().ref('recipes/' + key);

    ref.on('value', snapshot => {
      this.setState({
        recipeName: snapshot.val().name,
        creator: snapshot.val().creator,
        category: snapshot.val().category,
        cooktime: snapshot.val().cooktime
      })
    })
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={{fontSize:30}}>{this.state.recipeName}</Text>
        <Text style={{fontSize:15, color: 'rgb(168, 168, 168)'}}>{this.state.creator}</Text>
        <Text>{this.state.category}</Text>
        <Text>{this.state.cooktime}</Text>
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

export default RecipeDescription;
