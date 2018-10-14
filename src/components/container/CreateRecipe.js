import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { Recipe } from '../presentation';
import firebase from 'react-native-firebase';
import { Icon, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { Form, Item, Picker, Input, Label } from 'native-base';
import Test from '../reducers/test.js';
import { store } from '../reducers';
import { Provider } from 'react-redux';

class CreateRecipe extends Component {
  constructor(props) {
    super(props);
    this.state={
      currentUser: null,
      recipeName: '',
      creator: '',
      category: '',
      cooktime: '',
      ingredients: [{ name: '', quantity: ''}],
      instructions: [{ step: ''}]
    }
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

  componentDidMount(){
    var user = firebase.auth().currentUser;
    this.setState({
      currentUser: user
    })
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
    if(copy.length < 2){
      return;
    }
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

  submitForm(){
    if(this.state.recipeName === ''){
      Alert.alert('recipe needs a name!');
      return;
    }
    else if(this.state.category === ''){
      Alert.alert('missing category!');
      return;
    }
    let key = this.state.recipeName + '-' + this.state.creator + '-' + this.state.currentUser.uid;
    let path = 'users/' + this.state.currentUser.uid;

    firebase.database().ref(path).child('recipeList').push({
      recipename: this.state.recipeName,
      creator: this.state.creator,
      key: key
    });

    firebase.database().ref('recipes').child(key).set({
      name: this.state.recipeName,
      creator: this.state.creator,
      category: this.state.category,
      cooktime: this.state.cooktime,
      ingredients: this.state.ingredients,
      instructions: this.state.instructions
    });

    this.setState({
      currentUser: null,
      recipeName: '',
      creator: '',
      category: '',
      cooktime: '',
      ingredients: [{ name: '', quantity: ''}],
      instructions: [{ step: ''}]
    })
  }

  render(){
    return(
      <View style={styles.container}>
        <Test/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgb(255, 255, 255)',
  },
  containerScroll: {
    flexGrow: 1,
    alignItems: 'center',
  },
  footer: {
    alignItems:'center',
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor:'rgb(209, 207, 207)'
  },
  textHeader: {
    width:80+'%',
    justifyContent:'flex-start',
    marginBottom: 5
  },
  textinput: {
    width:80+'%',
    padding: 5,
    marginBottom: 20,
    borderBottomColor: 'rgb(209, 207, 207)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  instructioninput: {
    width:80+'%',
    padding: 5,
    borderBottomColor: 'rgb(209, 207, 207)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowStyle: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom: 20
  },
  ingredientinput: {
    width:65+'%',
    padding: 5,
    borderBottomColor: 'rgb(209, 207, 207)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  quantityinput: {
    width:30+'%',
    padding: 5,
    borderBottomColor: 'rgb(209, 207, 207)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  button: {
    width:70+'%',
    padding: 7,
    borderRadius: 5,
    backgroundColor:'rgb(57, 181, 174)',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgb(52, 164, 158)',
    borderWidth: 1
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor:'rgb(57, 181, 174)',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgb(52, 164, 158)',
    borderWidth: 1,
    marginBottom: 20
  }
});
//
// <ScrollView
//   contentContainerStyle={styles.containerScroll}
// >
//
//   {/* Recipe Name input -- Required */}
//
//   <FormLabel>Recipe Name</FormLabel>
//   <FormInput
//     onChangeText={recipeName => this.setState({recipeName})}
//     placeholder='Beef Wellington'
//   />
//   <FormValidationMessage>Error message</FormValidationMessage>
//
//   <FormLabel>Creator</FormLabel>
//   <FormInput
//     onChangeText={creator => this.setState({creator})}
//     placeholder='Gordon Ramsey'
//   />
//   <FormValidationMessage>Error message</FormValidationMessage>
//
//   <Form>
//
//     <Item picker>
//       <Picker
//         mode="dropdown"
//         iosIcon={<Icon name='menu' />}
//         placeholder="Select your SIM"
//         selectedValue={this.state.category}
//         onValueChange={category => this.setState({category})}
//       >
//         <Picker.Item label="Wallet" value="key0" />
//         <Picker.Item label="ATM Card" value="key1" />
//         <Picker.Item label="Debit Card" value="key2" />
//         <Picker.Item label="Credit Card" value="key3" />
//         <Picker.Item label="Net Banking" value="key4" />
//       </Picker>
//     </Item>
//   </Form>
//
// </ScrollView>


export default CreateRecipe;
