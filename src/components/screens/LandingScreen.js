import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Fonts } from '../../utils/fonts';
import config from '../../config'


class LandingScreen extends Component {
  navToLogin() {
    this.props.navigation.navigate('login');
  }

  navToSignUp() {
    this.props.navigation.navigate('signup');
  }

  render(){
    return(
      <View style={styles.container}>
        <Image style={styles.logo} source = {config.images.logo} resizeMode={"contain"}/>
        <TouchableOpacity
          onPress={() => {
            this.navToSignUp();
          }}
          style={styles.button}
        >
          <Text style={{color:'rgb(255, 255, 255)'}}>Sign Up</Text>
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
    backgroundColor: 'rgb(255, 255, 255)',
  },
  button: {
    width:70+'%',
    padding: 7,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor:'rgb(57, 181, 174)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 75+'%',
    height: 20+'%',
    marginBottom: 30
  }
});

export default LandingScreen;
