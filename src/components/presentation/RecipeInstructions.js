import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from 'react-native-firebase';
import Logo from './Logo.js';

class RecipeInstructions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instructions: [{ step: ''}]
    }
  }
  componentDidMount(){
    var key = this.props.navigation.getParam('recipeid');
    ref = firebase.database().ref('recipes/' + key);

    ref.on('value', snapshot => {
      this.setState({
        instructions: snapshot.val().instructions
      })
    })
  }

  render(){
    return(
      <View style={styles.container}>
        {this.state.instructions.map((item,index) =>
          <Text key={index}>{index+1}. {item.step}</Text>
        )}
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

export default RecipeInstructions;
