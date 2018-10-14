import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { Icon } from 'react-native-elements'
import firebase from 'react-native-firebase';

import { Recipe, Logo } from '../presentation';
import { CreateRecipe } from '../container';
import colors from '../../utils/colors.js';

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
            style={styles.listItems}
            data={this.state.myRecipes}
            extraData={this.state}
            renderItem={({ item, index }) =>
              <TouchableOpacity
                key={index}
                style = {styles.recipeTab}
                onPress = {() => this.selectRecipe(item.key)}
              >
                <View style={styles.itemRow}>
                  <View>
                    <Text>{item.recipename}</Text>
                    <Text style={styles.creatorText}>{item.creator}</Text>
                  </View>
                  <Icon name='navigate-next' color={colors.dark}/>
                </View>

              </TouchableOpacity>
            }
          />

        <TouchableOpacity
          style={styles.button}
          onPress = {() => this.signOut()}
        >
          <Text style={styles.whiteText}>sign out</Text>
        </TouchableOpacity>

        {/* sign out button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {this.navToTestCreate()}}
        >
          <Text style={styles.whiteText}>test create</Text>
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
    paddingVertical:10,
    backgroundColor: colors.primaryBackground,
  },
  listItems: {
    flex:1,
    width:95+'%'
  },
  itemRow: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center'
  },
  button: {
    width:70+'%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
    marginBottom: 10,
    borderColor: colors.primaryBorder,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  recipeTab: {
    padding: 5,
    paddingHorizontal:10,
    borderRadius: 5,
    backgroundColor: colors.veryLight,
    marginBottom: 5,
    borderColor: colors.light,
    borderWidth: 1
  },
  creatorText: {
    color: colors.placeholder,
    fontSize: 12
  },
  whiteText: {
    color:"rgb(255, 255, 255)"
  },
  logo: {
    width: 50+'%',
    height: 10+'%',
    marginBottom: 30
  }
});

export default MainFeed;
