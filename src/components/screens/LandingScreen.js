import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import config from '../../config'
import colors from '../../utils/colors.js';

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
          <Text style={styles.whiteText}>Sign Up</Text>
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
    backgroundColor: colors.backgroundColor,
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
  logo: {
    width: 75+'%',
    height: 20+'%',
    marginBottom: 30
  },
  whiteText: {
    color:"rgb(255, 255, 255)"
  },
});

export default LandingScreen;
