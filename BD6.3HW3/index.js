let express = require('express');
let app = express();
app.use(express.json());

let recipes = [
  {
    id: 1,
    name: 'Spaghetti Bolognese',
    cuisine: 'Italian',
    difficulty: 'Medium',
  },
  {
    id: 2,
    name: 'Chicken Tikka Masala',
    cuisine: 'Indian',
    difficulty: 'Hard',
  },
];

async function getRecipes() {
  return recipes;
}

async function getRecipesById(id) {
  return recipes.find((obj) => obj.id === id);
}

async function addRecipe(data) {
  data.id = recipes.length + 1;
  recipes.push(data);
  return data;
}

app.get('/recipes', async (req, res) => {
  let result = await getRecipes();
  res.status(200).json(result);
});

app.get('/recipes/details/:id', async (req, res) => {
  let id = parseInt(req.params.id);
  let result = await getRecipesById(id);
  if (!result) {
    return res.status(404).send(null);
  }
  res.status(200).json(result);
});

app.post('/recipes/new', async (req, res) => {
  let data = req.body;
  let result = await addRecipe(data);
  res.status(200).json(result);
});

module.exports = { app, getRecipes, getRecipesById, addRecipe };
