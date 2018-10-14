import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { Container, Item, Input, Header, Body, Content, Title, Button } from 'native-base';
import { Field } from 'redux-form';
import { Icon } from 'react-native-elements';

const renderNameField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <View style={styles.nameContainer}>
      <TextInput
        {...input}
        style ={styles.textInput}
        placeholder={label}
      />
      {touched && error && <Text>{error}</Text>}
    </View>
)

const renderMeasureField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <View style={styles.measureContainer}>
      <TextInput
        {...input}
        style ={styles.textInput}
        placeholder={label}
      />
      {touched && error && <Text>{error}</Text>}
    </View>
)


const renderInstructions = ({ fields }) => (
  <ScrollView
    contentContainerStyle={styles.scrollContainer}
    ref={ref => this.scrollView = ref}
    onContentSizeChange={(contentWidth, contentHeight)=>{
      this.scrollView.scrollToEnd({animated: true})
    }}
    >
    {fields.map((instructions, index) =>
      <View key={index} style={styles.container}>
        <View flexDirection='row' justifyContent='space-between' style={{width:95+'%', marginBottom:10}}>
          <Field
            name={`${instructions}.step`}
            type="text"
            component={renderNameField}
            label= {"instruction " + (index+1)}
          />
          <TouchableOpacity
            onPress = {() => fields.remove(index)}
            style={styles.removeButton}
          >
            <Icon type='font-awesome' name='trash-o' color='white' size={17}/>
          </TouchableOpacity>
        </View>
      </View>
    )}
    <View style={styles.addContainer}>
      <TouchableOpacity
        onPress = {() => fields.push({})}
        style ={styles.addButton}
      >
        <Text style={{color:'white'}}>Add instruction</Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
)

const styles = StyleSheet.create({
  scrollContainer: {
    width:100+'%',
    justifyContent: 'center',
    alignItems:'center',
  },
  container: {
    width:100+'%',
    justifyContent: 'center',
    alignItems:'center',
    paddingVertical: 8,
    marginBottom:5,
    backgroundColor: 'rgba(241, 249, 249, 0.55)',
    borderColor: 'rgba(240, 240, 240, 1)',
    borderWidth:1
  },
  addContainer: {
    width:100+'%',
    justifyContent: 'center',
    alignItems:'center',
    padding: 5,
  },
  nameContainer: {
    width:84+'%',
    justifyContent: 'center',
    alignItems:'center',
  },
  textInput: {
    flex:1,
    width:100+'%',
    padding: 5,
    borderBottomColor: 'rgb(209, 207, 207)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  addButton: {
    backgroundColor: 'rgb(57, 181, 174)',
    borderRadius:5,
    borderWidth:1,
    borderColor: 'rgb(52, 164, 158)',
    padding: 7,
    width: 80+'%',
    alignItems:'center',
    justifyContent: 'center'
  },
  removeButton: {
    backgroundColor: 'rgba(191, 125, 125, 0.79)',
    borderRadius:5,
    borderWidth:1,
    borderColor: 'rgb(194, 95, 95)',
    padding: 4,
    width: 7+'%',
    alignItems:'center',
    justifyContent: 'center'
  }
});

export default renderInstructions