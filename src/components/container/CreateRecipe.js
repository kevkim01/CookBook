import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView, Alert, Picker } from 'react-native';
import { Recipe } from '../presentation';
import firebase from 'react-native-firebase';
import { Icon } from 'react-native-elements';

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


  // ref={ref => this.scrollView = ref}
  // onContentSizeChange={(contentWidth, contentHeight)=>{
  //   this.scrollView.scrollToEnd({animated: true})
  // }}
  render(){
    return(
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.containerScroll}
        >

          {/* Recipe Name input -- Required */}
          <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center'}}>
            <Text style={{color:'red', fontWeight:'bold'}}>* </Text>
            <Text style={styles.textHeader}>name your recipe</Text>
          </View>
          <TextInput
            style = {styles.textinput}
            placeholder='ex: beef wellington'
            spellCheck={true}
            autoCorrect={false}
            value={this.state.recipeName}
            onChangeText={recipeName => this.setState({recipeName})}
          />

          {/* Creator input */}
          <Text style={styles.textHeader}>who created it?</Text>
          <TextInput
            style = {styles.textinput}
            placeholder='ex: gordon ramsey'
            spellCheck={true}
            autoCorrect={false}
            value={this.state.creator}
            onChangeText={creator => this.setState({creator})}
          />

          {/* Cook time input */}
          <Text style={styles.textHeader}>cook time</Text>
          <TextInput
            style = {styles.textinput}
            placeholder='ex: 1 hr'
            spellCheck={true}
            autoCorrect={false}
            value={this.state.cooktime}
            onChangeText={cooktime => this.setState({cooktime})}
          />

          {/* <Text style={{color:'rgb(208, 204, 204)', fontSize:14}}>choose category</Text> */}
          <View style={styles.rowStyle}>
            <Text style={{color:'red', fontWeight:'bold'}}>*</Text>
            <Picker
              mode='dropdown'
              selectedValue={this.state.category}
              style={{ width: 80 +'%', height: 100}}
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
          <Text style={styles.textHeader}>add your ingredients and measures</Text>
          {this.state.ingredients.map((item,index) =>
            <View style={styles.rowStyle} key = {index}>
              <Text style={{color:"rgb(255, 255, 255)"}}> x</Text>
              <View style={{width:80+'%', flexDirection:'row', justifyContent:'space-between'}}>
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
                <Icon
                  name='remove-circle-outline'
                  size= {15}
                  onPress={() => {this.deleteInput(index, 'ingredients')}}
                  containerStyle={{alignItems:'center'}}
                  />
              </TouchableOpacity>
            </View>
          )}

          {/* add ingredients button */}
          <TouchableOpacity
            style = {styles.addButton}
            onPress={() => {this.addInput('ingredients')}}
          >
            <Text style={{color:"rgb(255, 255, 255)", fontWeight:'bold'}}>+</Text>
          </TouchableOpacity>

          {/* Instructions input */}
          <Text style={styles.textHeader}>add your instructions</Text>
          {this.state.instructions.map((item,index) =>
            <View style={styles.rowStyle} key = {index}>
              <Text style={{color:"rgb(255, 255, 255)"}}> x</Text>
              <TextInput
                style={styles.instructioninput}
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
              <Icon
                name='remove-circle-outline'
                size= {15}
                onPress={() => {this.deleteInput(index, 'instructions')}}
                containerStyle={{alignItems:'center'}}
                />
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
    paddingTop: 10,
    paddingBottom: 10
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

export default CreateRecipe;
