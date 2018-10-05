import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView, Alert, Picker } from 'react-native';
import { Recipe } from '../presentation';
import firebase from 'react-native-firebase';


class CreateRecipe extends Component {
  constructor(props) {
    super(props);
    this.state={
      currentUser: null,
      recipeName: '',
      creator: '',
      category: '',
      ingredients: [{ name: '', quantity: ''}],
      instructions: [{ step: ''}]
    }
  }
  static navigationOptions = {
    title: 'Create Recipe',
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
      ingredients: this.state.ingredients,
      instructions: this.state.instructions
    });

    this.setState({
      currentUser: null,
      recipeName: '',
      creator: '',
      category: '',
      ingredients: [{ name: '', quantity: ''}],
      instructions: [{ step: ''}]
    })
  }

  render(){
    return(
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.containerScroll} style={{flex:1, paddingTop: 20}}>

          {/* Recipe Name input -- Required */}
          <Text style={{width:70+'%', justifyContent:'flex-start'}}>name your recipe</Text>
          <View style={styles.rowStyle}>
            <Text style={{color:'red',paddingBottom:15}}>*</Text>
            <TextInput
              style = {styles.textinput}
              placeholder='ex: beef wellington'
              spellCheck={true}
              autoCorrect={false}
              value={this.state.recipeName}
              onChangeText={recipeName => this.setState({recipeName})}
            />
            <Text style={{color:"rgb(255, 255, 255)"}}>*</Text>
          </View>

          {/* Creator input */}
          <Text style={{width:70+'%', justifyContent:'flex-start'}}>who created it?</Text>
          <TextInput
            style = {styles.textinput}
            placeholder='ex: gordon ramsey'
            spellCheck={true}
            autoCorrect={false}
            value={this.state.creator}
            onChangeText={creator => this.setState({creator})}
          />

          {/* <Text style={{color:'rgb(208, 204, 204)', fontSize:14}}>choose category</Text> */}

          <View style={styles.rowStyle}>
            <Text style={{color:'red',paddingBottom:25}}>*</Text>
            <Picker
              mode='dropdown'
              selectedValue={this.state.category}
              style={{ width: 70 +'%', height: 100, marginBottom: 20, marginTop: -10}}
              itemStyle={{fontSize:15, height:100}}
              onValueChange={(item, index) => this.setState({category:item})}
            >
              <Picker.Item label='choose category' value='' />
              <Picker.Item label='appetizer' value='appetizer' />
              <Picker.Item label='main course' value='main course' />
              <Picker.Item label='desert' value='desert' />
            </Picker>
            <Text style={{color:"rgb(255, 255, 255)"}}>*</Text>
          </View>

          {/* Ingredients input */}
          <Text style={{width:70+'%', justifyContent:'flex-start'}}>add your ingredients and measures</Text>
          {this.state.ingredients.map((item,index) =>
            <View style={styles.rowStyle} key = {index}>
              <Text style={{color:"rgb(255, 255, 255)"}}> x</Text>
              <View style={{width:70+'%', flexDirection:'row', justifyContent:'space-between'}}>
                <TextInput
                  style={styles.ingredientinput}
                  placeholder='ex: filet mignon'
                  spellCheck={true}
                  autoCorrect={false}
                  clearButtonMode={'while-editing'}
                  value={item.name}
                  onChangeText={(e)=> this.handleChange(e, index, 'ingredients', 'name')}
                />
                <TextInput
                  style={styles.quantityinput}
                  placeholder='ex: 1 lb'
                  spellCheck={true}
                  autoCorrect={false}
                  clearButtonMode={'while-editing'}
                  value={item.quantity}
                  onChangeText={(e)=> this.handleChange(e, index, 'ingredients', 'quantity')}
                />
              </View>
              <TouchableOpacity
                onPress={() => {this.deleteInput(index, 'ingredients')}}
              >
                <Text style={{color:'rgb(209, 207, 207)', paddingBottom:15}}> x</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* add ingredients button */}
          <TouchableOpacity
            style = {styles.addButton}
            onPress={() => {this.addInput('ingredients')}}
          >
            <Text style={{color:"rgb(255, 255, 255)"}}>+</Text>
          </TouchableOpacity>

          {/* Instructions input */}
          <Text style={{width:70+'%', justifyContent:'flex-start'}}>add your instructions</Text>
          {this.state.instructions.map((item,index) =>
            <View style={styles.rowStyle} key = {index}>
              <Text style={{color:"rgb(255, 255, 255)"}}> x</Text>
              <TextInput
                style={styles.textinput}
                placeholder='ex: season filet with salt'
                spellCheck={true}
                autoCorrect={false}
                clearButtonMode={'while-editing'}
                value={item.step}
                onChangeText={(e)=> this.handleChange(e, index,'instructions', 'step')}
              />
              <TouchableOpacity
                onPress={() => {this.deleteInput(index, 'instructions')}}
              >
                <Text style={{color:'rgb(209, 207, 207)', paddingBottom:15}}> x</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* add instructions button */}
          <TouchableOpacity
            style = {styles.addButton}
            onPress={() => {this.addInput('instructions')}}
          >
            <Text style={{color:"rgb(255, 255, 255)"}}>+</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.footer}>

          {/* submit button */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {this.submitForm()}}
          >
            <Text style={{color:"rgb(255, 255, 255)"}}>Submit</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: 'rgb(239, 247, 250)',
    paddingTop: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor:'rgb(209, 207, 207)'
  },
  textinput: {
    width:70+'%',
    padding: 5,
    marginBottom: 20,
    borderBottomColor: 'rgb(209, 207, 207)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowStyle: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  ingredientinput: {
    width:65+'%',
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
  button: {
    width:70+'%',
    padding: 7,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor:'rgb(57, 181, 174)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor:'rgb(57, 181, 174)',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default CreateRecipe;
