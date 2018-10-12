import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { Container, Item, Input, Header, Body, Content, Title, Button, Toast, Picker } from 'native-base';
import { Icon } from 'react-native-elements';

const renderPickerField = ({ input: { onChange, value, ...inputProps }, label, type, children, meta: { touched, error, warning }, ...pickerProps }) => (
    <View style={styles.container}>
      <Text>{type}</Text>
      <Picker
        {...inputProps}
        {...pickerProps}
        mode="dropdown"
        iosIcon={<Icon type='ionicon' name='ios-arrow-dropdown' color='rgb(209, 207, 207)'/>}
        placeholder={label}
        placeholderStyle={{color: 'rgb(209, 207, 207)', paddingLeft:2}}
        selectedValue={ value }
        onValueChange={ value => onChange(value) }
        style={[styles.textInput, touched && error ? styles.invalid : styles.valid]}
        textStyle={{fontSize:14, paddingLeft:2}}
      >
        {children}
      </Picker>
      {touched && error && <Text style={{color:'rgb(191, 35, 35)', paddingTop: 5}}>{error}</Text>}
    </View>
)

const styles = StyleSheet.create({
  container: {
    width:80+'%',
    justifyContent: 'center',
    marginBottom:30
  },
  textInput: {
    width:100+'%',
    paddingRight: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  valid: {
    borderBottomColor: 'rgb(209, 207, 207)',
  },
  invalid: {
    borderBottomColor: 'rgb(191, 35, 35)',
  }
});

export default renderPickerField
