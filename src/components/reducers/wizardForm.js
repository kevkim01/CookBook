import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import PropTypes from 'prop-types';
import WizardFormFirstPage from './wizardFormFirstPage';
import WizardFormSecondPage from './wizardFormSecondPage';
import WizardFormThirdPage from './wizardFormThirdPage';


class WizardForm extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.state = {
      page: 1
    }
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  render() {
    const { onSubmit } = this.props
    const { page } = this.state
    return (
      <View style={styles.container}>
        <View flexDirection='row' justifyContent='space-between' alignItems='center' style={{width:50+'%'}}>
          <View style={ page == 1 ? styles.progressBallActive : styles.progressBall}>
            <Text style={page == 1 ? styles.textBallActive : styles.textBall}>1</Text>
          </View>
          <View style={styles.line}></View>
          <View style={ page == 2 ? styles.progressBallActive : styles.progressBall}>
            <Text style={page == 2 ? styles.textBallActive : styles.textBall}>2</Text>
          </View>
          <View style={styles.line}></View>
          <View style={ page == 3 ? styles.progressBallActive : styles.progressBall}>
            <Text style={page == 3 ? styles.textBallActive : styles.textBall}>3</Text>
          </View>
        </View>

        {page === 1 && <WizardFormFirstPage onSubmit={this.nextPage} />}
        {page === 2 && (
          <WizardFormSecondPage
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )}
        {page === 3 && (
          <WizardFormThirdPage
            previousPage={this.previousPage}
            onSubmit={onSubmit}
          />
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems:'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  progressBall: {
    height:30,
    width:30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth:2,
    borderColor: 'rgb(52, 164, 158)',
  },
  progressBallActive: {
    height:35,
    width:35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'rgb(57, 181, 174)',
    borderWidth:2,
    borderColor: 'rgb(52, 164, 158)',
  },
  textBall: {
  },
  textBallActive: {
    color:'white',
    fontWeight:'bold'
  },
  line:{
    height:2,
    width: 20+'%',
    backgroundColor: 'rgb(57, 181, 174)',
    borderRadius:4,
    borderWidth:1,
    borderColor: 'rgb(52, 164, 158)',
  }
})

WizardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default WizardForm
