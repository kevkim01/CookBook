import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Recipe } from '../presentation';
import firebase from 'react-native-firebase';


class MainFeed extends Component {
  constructor(props) {
    super(props);
    this.state={
      currentUser: null,
      recipeName: '',
      ingredients: [{ name: '', quantity: ''}],
      instructions: [{ step: ''}]
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

  addInput(category){
    if(category === 'ingredients'){
      this.setState({
        ingredients: [...this.state.ingredients, {name:'', quantity: ''} ]
      })
    }
    else{
      this.setState({
        instructions: [...this.state.instructions, {step:''}]
      })
    }

  }

  deleteInput(index, category){
    let copy = JSON.parse(JSON.stringify(this.state[category]));
    copy.splice(index,1);
    this.setState({
      [category]: copy
    })
  }

  handleChange(e,index,category,field){
    let copy = JSON.parse(JSON.stringify(this.state[category]));
    copy[index][field] = e;
    this.setState({
      [category]: copy
    })
  }

  render(){
    return(
      <ScrollView contentContainerStyle={styles.container}>
        <Text>Hi {this.state.currentUser && this.state.currentUser.email}</Text>

        <Text>recipe name</Text>
        <TextInput
          style = {styles.textinput}
          placeholder='recipe name'
          spellCheck={true}
          autoCorrect={false}
          value={this.state.recipeName}
          onChangeText={recipeName => this.setState({recipeName})}
        />

        <Text>Ingredients</Text>

        {this.state.ingredients.map((item,index) =>
          <View style={{flexDirection: 'row', width: 70+ '%', justifyContent: 'space-between'}} key = {index}>
            <TextInput
              style={styles.ingredientinput}
              placeholder='ingredient'
              spellCheck={true}
              autoCorrect={false}
              clearButtonMode={'while-editing'}
              value={item.name}
              onChangeText={(e)=> this.handleChange(e, index, 'ingredients', 'name')}
            />
            <TextInput
              style={styles.quantityinput}
              placeholder='measure'
              spellCheck={true}
              autoCorrect={false}
              clearButtonMode={'while-editing'}
              value={item.quantity}
              onChangeText={(e)=> this.handleChange(e, index, 'ingredients', 'quantity')}
            />
            <TouchableOpacity
              onPress={() => {this.deleteInput(index, 'ingredients')}}
            >
              <Text style={{color:'rgb(209, 207, 207)'}}>x</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style = {styles.addButton}
          onPress={() => {this.addInput('ingredients')}}
        >
          <Text style={{color:"rgb(255, 255, 255)"}}>+</Text>
        </TouchableOpacity>



        <Text>Instructions</Text>

        {this.state.instructions.map((item,index) =>
          <View style={{flexDirection: 'row', width: 70+ '%', justifyContent: 'space-between'}} key = {index}>
            <TextInput
              style={styles.instructioninput}
              placeholder='instruction'
              spellCheck={true}
              autoCorrect={false}
              clearButtonMode={'while-editing'}
              value={item.name}
              onChangeText={(e)=> this.handleChange(e, index,'instructions', 'step')}
            />
            <TouchableOpacity
              onPress={() => {this.deleteInput(index, 'instructions')}}
            >
              <Text style={{color:'rgb(209, 207, 207)'}}>x</Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style = {styles.addButton}
          onPress={() => {this.addInput('instructions')}}
        >
          <Text style={{color:"rgb(255, 255, 255)"}}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {}}
        >
          <Text>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {this.signOut()}}
        >
          <Text>Sign Out</Text>
        </TouchableOpacity>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(255, 255, 255)',
  },
  textinput: {
    width:70+'%',
    padding: 5,
    marginBottom: 20,
    borderBottomColor: 'rgb(209, 207, 207)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  ingredientinput: {
    width:60+'%',
    padding: 5,
    marginBottom: 20,
    borderBottomColor: 'rgb(209, 207, 207)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  quantityinput: {
    width:30+'%',
    padding: 5,
    marginBottom: 20,
    borderBottomColor: 'rgb(209, 207, 207)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  instructioninput: {
    width:93+'%',
    padding: 5,
    marginBottom: 20,
    borderBottomColor: 'rgb(209, 207, 207)',
    borderBottomWidth: StyleSheet.hairlineWidth,
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
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor:'rgb(57, 181, 174)',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default MainFeed;
