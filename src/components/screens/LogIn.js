import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, TextInput, Image } from 'react-native';
import config from '../../config';
import firebase from 'react-native-firebase';

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        email:"",
        password:"",
        errorMessage: null,
      }
    };
  }

  navToSignUp() {
    //Navigate to sign up
    this.props.navigation.navigate('signup');
  }

  submitForm() {
    firebase.auth().signInAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => this.props.navigation.navigate('main'))
    .catch(error => this.setState({ errorMessage: error.message }))
  }

  render(){
    return(
      <View style={styles.container}>
        <Image style={styles.logo} source = {config.images.logo} resizeMode={"contain"}/>

        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}

        <TextInput
          style={styles.textinput}
          placeholder='email'
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode={'while-editing'}
          keyboardType={'email-address'}
          onChangeText={email => this.setState({email})}
          value={this.state.email}
        />
        <TextInput
          style={styles.textinput}
          placeholder='password'
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode={'while-editing'}
          onChangeText={password => this.setState({password})}
          value={this.state.password}
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
  },
  logo: {
    width: 50+'%',
    height: 10+'%',
    marginBottom: 30
  }
});

export default LogIn;
