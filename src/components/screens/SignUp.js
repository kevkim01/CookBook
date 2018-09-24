import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

class SignUp extends Component {

  navToLogin() {
    //Navigate to Log in
    this.props.navigation.navigate('login');
  }

  submitForm() {
    this.props.navigation.navigate('main');
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={{marginBottom:40, fontSize: 30}}>Sign up page</Text>

        <TextInput
          style={styles.textinput}
          placeholder='username'
        />
        <TextInput
          style={styles.textinput}
          placeholder='email'
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
          <Text>Have an account?</Text>
          <TouchableOpacity
            onPress={() => {this.navToLogin();}}
          >
            <Text style={{color:'rgb(57, 181, 174)'}}> Log In</Text>
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

export default SignUp;
