import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { Container, Item, Input, Header, Body, Content, Title, Button, Toast, Picker } from 'native-base';
import { Icon } from 'react-native-elements';
import { Field, reduxForm } from 'redux-form';
import validate from '../reducers/validate';
import RenderText from '../renderFields/renderText';
import RenderPicker from '../renderFields/renderPicker';


const DescriptionForm = props => {
  const { handleSubmit } = props
  return (
    <View style={styles.container}>
      <Text style={{marginBottom:10+'%', fontSize:20, fontWeight:'bold'}}>Recipe Description</Text>
      <Field
        name="recipeName"
        type="enter recipe name"
        component={RenderText}
        label="ex. Beef Wellington"
      />
      <Field
        name="creator"
        type="who created this recipe?"
        component={RenderText}
        label="ex. Gordon Ramsey"
      />
      <Field
        name="category"
        type="how is this dish classified?"
        component={RenderPicker}
        label="select a value"
      >
        <Picker.Item label="appetizer" value="appetizer" />
        <Picker.Item label="main course" value="maincourse" />
        <Picker.Item label="soup and salad" value="soupandsalad" />
        <Picker.Item label="desert" value="desert" />
      </Field>

      <TouchableOpacity
        onPress={handleSubmit}
        style={styles.button}
      >
        <View flexDirection='row' justifyContent='center' alignItems='center'>
          <Text style={{color:'white'}}>next</Text>
          <Icon type='feather' name='arrow-right' color='white' size={17}/>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    width:100+'%',
    alignItems:'center',
    paddingVertical:30
  },
  button: {
    backgroundColor: 'rgb(57, 181, 174)',
    borderRadius:4,
    borderWidth:1,
    borderColor: 'rgb(52, 164, 158)',
    padding: 7,
    width: 25+'%',
  }
})

export default reduxForm({
  form: 'wizard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(DescriptionForm)
