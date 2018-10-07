import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView, Image, Alert } from 'react-native';
import { Recipe, Logo } from '../presentation';
import { CreateRecipe } from '../container';
import firebase from 'react-native-firebase';


class MainFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      myRecipes: []
    }
  }

  static navigationOptions = {
    headerTitle: <Logo />,
    headerRight: (
      <TouchableOpacity
        onPress = {() => Alert.alert('button')}
      >
        <Text>[ menu ]</Text>
      </TouchableOpacity>
    ),
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

  selectRecipe(key) {
    console.log(key);
    this.props.navigation.navigate('recipepage',{recipeid: [key]});
  }

  render(){
    return(
      <View style={styles.container}>
        <Text>Hi {this.state.currentUser && this.state.currentUser.email}</Text>

          <FlatList
            style={{flex:1, width:100+'%'}}
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
                  <Text>></Text>
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
          onPress={() => {this.signOut()}}
        >
          <Text style={{color:"rgb(255, 255, 255)"}}>Sign Out</Text>
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
    backgroundColor: 'rgba(236, 246, 246, 0.67)',
    marginBottom: 5
  },
  logo: {
    width: 50+'%',
    height: 10+'%',
    marginBottom: 30
  }
});

export default MainFeed;
