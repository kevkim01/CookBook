import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class LandingScreen extends Component {
  navToLogin() {
    //Navigate to Log in
    this.props.navigation.navigate('login');
  }

  navToSignUp() {
    //Navigate to sign up
    this.props.navigation.navigate('signup');
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={{color:'white', fontSize:40, fontStyle:"italic"}}>Cook Book</Text>
        <TouchableOpacity
          onPress={() => {
            this.navToSignUp();
          }}
        >
          <Text>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {this.navToLogin();}}
        >
          <Text>Log In</Text>
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
    backgroundColor: 'rgb(57, 181, 174)',
  },
});

export default LandingScreen;
