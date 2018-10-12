import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';
import Logo from './Logo.js';
import { createTabNavigator } from 'react-navigation';

class RecipeIngredients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [{ name: '', measure: ''}]
    }
  }

  componentDidMount(){
    var key = this.props.navigation.getParam('recipeid');
    ref = firebase.database().ref('recipes/' + key);
    ref.on('value', snapshot => {
      this.setState({
        ingredients: snapshot.val().ingredients,
      })
    })
  }

  render(){
    return(
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.containerScroll} >
          {this.state.ingredients.map((item,index) =>
            <View key={index} style={styles.row}>
              <View style={{flex:1}}>
                <View style={styles.numbers}>
                  <Text style={{color:'white', fontWeight:'bold'}}>{index+1}</Text>
                </View>
              </View>

              <View style={{flex:2, alignItems:'flex-start'}}>
                <Text>{item.name}</Text>
              </View>

              <View style={{flex:2, alignItems:'flex-end'}}>
                <Text>{item.measure}</Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgb(255, 255, 255)',
    paddingTop: 30,
    paddingBottom: 30,
  },
  containerScroll: {
    flexGrow: 1,
    alignItems: 'center',
  },
  numbers: {
    backgroundColor: 'rgb(57, 181, 174)',
    width: 30,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20
  },
  row: {
    flexDirection:'row',
    alignItems:'center',
    width: 70+'%',
    marginBottom: 15
  }
});

export default RecipeIngredients;
