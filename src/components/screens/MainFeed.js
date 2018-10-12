import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView, Image, Alert } from 'react-native';
import { Recipe, Logo } from '../presentation';
import { CreateRecipe } from '../container';
import firebase from 'react-native-firebase';
import { Icon } from 'react-native-elements'

class MainFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      myRecipes: []
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
    ref = firebase.database().ref('users/' + user.uid + '/recipeList');

    ref.on('value', snapshot => {
      let recipes = []
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        recipes.push(childData);
      })
      this.setState({
        currentUser: user,
        myRecipes: recipes
      });
    })
  }

  signOut() {
    firebase.auth().signOut();
  }

  navToCreateRecipe() {
    this.props.navigation.navigate('createrecipe');
  }

  navToTestCreate() {
    this.props.navigation.navigate('testcreate');
  }

  selectRecipe(key) {
    console.log(key);
    this.props.navigation.navigate('recipepage',{recipeid: [key]});
  }

  render(){
    return(
      <View style={styles.container}>
          <FlatList
            style={{flex:1, width:95+'%'}}
            data={this.state.myRecipes}
            extraData={this.state}
            renderItem={({ item, index }) =>
              <TouchableOpacity
                key={index}
                style = {styles.recipeTab}
                onPress = {() => this.selectRecipe(item.key)}
              >
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems: 'center'}}>
                  <View>
                    <Text>{item.recipename}</Text>
                    <Text style={{color:'rgb(130, 130, 130)', fontSize: 12}}>{item.creator}</Text>
                  </View>
                  <Icon name='navigate-next' />
                </View>

              </TouchableOpacity>
            }
          />

        <TouchableOpacity
          style={styles.button}
          onPress = {() => this.navToCreateRecipe()}
        >
          <Text style={{color:"rgb(255, 255, 255)"}}>create recipe</Text>
        </TouchableOpacity>

        {/* sign out button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {this.navToTestCreate()}}
        >
          <Text style={{color:"rgb(255, 255, 255)"}}>test create</Text>
        </TouchableOpacity>
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
    paddingTop: 10,
    paddingBottom: 10,
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
  recipeTab: {
    padding: 5,
    paddingHorizontal:10,
    borderRadius: 5,
    backgroundColor: 'rgba(236, 246, 246, 0.5)',
    marginBottom: 5,
    borderColor: 'rgb(216, 231, 229)',
    borderWidth: 1
  },
  logo: {
    width: 50+'%',
    height: 10+'%',
    marginBottom: 30
  }
});

export default MainFeed;
