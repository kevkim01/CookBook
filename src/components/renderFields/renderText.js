import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';

const renderText = ({ input, label, type, meta: { touched, error, warning } }) => (
    <View style={styles.container}>
      <Text>{type}</Text>
      <TextInput
        {...input}
        style={[styles.textInput, touched && error ? styles.invalid : styles.valid]}
        placeholder={label}
      />
      {touched && error && <Text style={{color:'rgb(191, 35, 35)', paddingTop: 5}}>{error}</Text>}
    </View>
)

const styles = StyleSheet.create({
  container: {
    width:80+'%',
    justifyContent: 'center',
    alignItems:'flex-start',
    marginBottom:30
  },
  textInput: {
    width:100+'%',
    paddingVertical: 10,
    borderBottomColor: 'rgb(209, 207, 207)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  valid: {
    borderBottomColor: 'rgb(209, 207, 207)',
  },
  invalid: {
    borderBottomColor: 'rgb(191, 35, 35)',
  }
});

export default renderText
