const validate = values => {
  const errors = {}
  if (!values.recipeName) {
    errors.recipeName = 'Required'
  }
  if (!values.category) {
    errors.category = 'Required'
  }
  const ingErrors = []
  if (values.ingredients) {
    values.ingredients.forEach((ingredient, index) => {
      if ( !ingredient.name ){
         errors.ingredients = { _error : 'All ingredients require a name'}
      }
    })
  }
  return errors
}

export default validate
