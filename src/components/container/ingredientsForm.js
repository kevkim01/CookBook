import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { Icon } from 'react-native-elements';
import validate from '../reducers/validate';
import RenderIngredients from '../renderFields/renderIngredients';

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false

const IngredientsForm = props => {
  const { handleSubmit, previousPage } = props
  return (
    <View style={styles.container}>
      <FieldArray
        name="ingredients"
        component={RenderIngredients}
      />

      <View alignItems='center' justifyContent='center' style={{paddingTop:10}}>
        <View style={{width:80+'%'}} flexDirection='row' justifyContent='space-between'>
          <TouchableOpacity
            onPress={previousPage}
            style={styles.button}
          >
            <View flexDirection='row' justifyContent='center' alignItems='center'>
              <Icon type='feather' name='arrow-left' color='white' size={17}/>
              <Text style={{color:'white'}}>previous</Text>
            </View>
          </TouchableOpacity>

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
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    width:100+'%',
    justifyContent: 'center',
    backgroundColor: 'rgb(255, 255, 255)',
    paddingVertical: 30
  },
  button: {
    backgroundColor: 'rgb(57, 181, 174)',
    borderRadius:4,
    borderWidth:1,
    borderColor: 'rgb(52, 164, 158)',
    padding: 7,
    width: 31.4+'%',
  }
})

export default reduxForm({
  form: 'wizard', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(IngredientsForm)
