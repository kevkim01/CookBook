const validate = values => {
  const errors = {}
  if (!values.recipeName) {
    errors.recipeName = 'Required'
  }
  if (!values.category) {
    errors.category = 'Required'
  }

  return errors
}

export default validate
