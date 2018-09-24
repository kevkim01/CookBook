import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, TextInput } from 'react-native';

class LogIn extends Component {

  navToSignUp() {
    //Navigate to sign up
    this.props.navigation.navigate('signup');
  }

  submitForm() {
    this.props.navigation.navigate('main');
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={{marginBottom:40, fontSize: 30}}>log in page</Text>

        <TextInput
          style={styles.textinput}
          placeholder='email or username'
        />
        <TextInput
          style={styles.textinput}
          placeholder='password'
          secureTextEntry
        />
        <TouchableOpacity
          style={styles.button}
          onPress={()=>{this.submitForm()}}
        >
          <Text style={{color:'rgb(255, 255, 255)'}}>submit</Text>
        </TouchableOpacity>

        <View style={{flexDirection:'row'}}>
          <Text>Need an account?</Text>
          <TouchableOpacity
            onPress={() => {this.navToSignUp();}}
          >
            <Text style={{color:'rgb(57, 181, 174)'}}> Sign Up</Text>
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
  textinput: {
    width:70+'%',
    padding: 5,
    marginBottom: 20,
    borderBottomColor: 'rgb(209, 207, 207)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
});

export default LogIn;
