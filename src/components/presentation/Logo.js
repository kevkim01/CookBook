import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import config from '../../config'

class Logo extends Component {
  render(){
    return(
      <Image style={styles.logo} source = {config.images.logo} resizeMode={"contain"}/>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 70+'%',
    height: 70+'%',
  }
});

export default Logo;
