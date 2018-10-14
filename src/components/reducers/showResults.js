import firebase from 'react-native-firebase';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default (async function showResults(values) {
  var user = firebase.auth().currentUser;
  let key = values.recipeName + '-' + values.creator + '-' + user.uid;
  let path = 'users/' + user.uid;

  firebase.database().ref(path).child('recipeList').push({
    recipename: values.recipeName,
    creator: values.creator,
    key: key
  });

  firebase.database().ref('recipes').child(key).set({
    name: values.recipeName,
    creator: values.creator,
    category: values.category,
    cookTime: values.cookTime,
    ingredients: values.ingredients,
    instructions: values.instructions
  });
  await sleep(500); // simulate server latency
  window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
});
