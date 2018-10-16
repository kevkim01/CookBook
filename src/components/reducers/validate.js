const validate = values => {
  const errors = {}
  if (!values.recipeName) {
    errors.recipeName = 'Required'
  }
  if (!values.category) {
    errors.category = 'Required'
  }
  if (values.ingredients) {
    values.ingredients.forEach((ingredient, index) => {
      if ( !ingredient.name ){
         errors.ingredients = { _error : 'All ingredients require a name'}
      }
    })
  }
  if (values.instructions) {
    values.instructions.forEach((instruction, index) => {
      if ( !instruction.step ){
         errors.instructions = { _error : 'All instructions require a step'}
      }
    })
  }
  return errors
}

export default validate
