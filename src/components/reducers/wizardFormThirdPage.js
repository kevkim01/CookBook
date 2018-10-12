import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet']
import renderField from './renderField'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';


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

const WizardFormThirdPage = props => {
  const { handleSubmit, pristine, previousPage, submitting } = props
  return (
    <View style={styles.container}>
      <Field
        name="email"
        type="email"
        component={renderField}
        label="email"
      />
      <TouchableOpacity
        onPress={previousPage}>
        <Text>Previous</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleSubmit}
        disabled={pristine || submitting}
        >
        <Text>SUBMIT</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: 'rgb(255, 255, 255)',
  },
})

export default reduxForm({
  form: 'wizard', //Form name is same
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(WizardFormThirdPage)
