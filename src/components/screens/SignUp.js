import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import firebase from 'react-native-firebase';
import config from '../../config';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        username: "",
        email:"",
        password:"",
      },
      errorMessage: null,
    };
  }

  navToLogin() {
    this.props.navigation.navigate('login');
  }

  submitForm() {
    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      this.props.navigation.navigate('main');
      var user = firebase.auth().currentUser;
      var uid = user.uid;
      firebase.database().ref('users').child(uid).set({
        email: this.state.email,
        username: this.state.username,
      });

    })
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
          placeholder='username'
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode={'while-editing'}
          onChangeText={username => this.setState({username})}
          value={this.state.username}
        />
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
          <Text style={styles.whiteText}>submit</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <Text>Have an account?</Text>
          <TouchableOpacity
            onPress={() => {this.navToLogin();}}
          >
            <Text style={styles.login}> Log In</Text>
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
  },
  whiteText: {
    color:"rgb(255, 255, 255)"
  },
  row: {
    flexDirection:'row'
  },
  login: {
    color:'rgb(57, 181, 174)',
  }
});

export default SignUp;
