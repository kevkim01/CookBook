import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeName: '',
      creator: '',
      ingredients: [{ name: '', quantity: ''}],
      instructions: [{ step: ''}]
    }
  }

  componentDidMount(){
    var key = this.props.navigation.getParam('recipeid');
    ref = firebase.database().ref('recipes/' + key);

    ref.on('value', snapshot => {
      this.setState({
        recipeName: snapshot.val().name,
        creator: snapshot.val().creator,
        ingredients: snapshot.val().ingredients,
        instructions: snapshot.val().instructions
      })
    })
  }

  render(){
    return(
      <View style={styles.container}>
        <Text>{this.state.recipeName}</Text>
        <Text>{this.state.creator}</Text>
        {this.state.ingredients.map((item,index) =>
          <View key={index} style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text>{item.name}</Text>
            <Text>{item.quantity}</Text>
          </View>
        )}
        {this.state.instructions.map((item,index) =>
          <Text key={index}>{item.step}</Text>
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

export default Recipe;
