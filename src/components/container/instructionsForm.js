import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import validate from '../reducers/validate';
import RenderText from '../reducers/renderText';
import RenderInstructions from '../reducers/renderInstructions';

const renderColorSelector = ({ input, meta: { touched, error } }) => (
  <div>
    <select {...input}>
      <option value="">Select a color...</option>
      {colors.map(val => (
        <option value={val} key={val}>
          {val}
        </option>
      ))}
    </select>
    {touched && error && <span>{error}</span>}
  </div>
)

const instructionsForm = props => {
  const { handleSubmit, pristine, previousPage, submitting, reset } = props
  return (
    <View style={styles.container}>
      <View alignItems='center'>
        <Field
          name="cookTime"
          type="recipe cook time"
          component={RenderText}
          label="ex. 1 hr"
        />
      </View>
      <FieldArray
        name="instructions"
        component={RenderInstructions}
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
            <View flexDirection='row' justifyContent='space-evenly' alignItems='center'>
              <Text style={{color:'white'}}>submit</Text>
              <Icon type='feather' name='check-circle' color='white' size={17}/>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={reset}
          style={styles.button}
        >
          <View flexDirection='row' justifyContent='center' alignItems='center'>
            <Text style={{color:'white'}}>reset</Text>
          </View>
        </TouchableOpacity>
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
})(instructionsForm)
