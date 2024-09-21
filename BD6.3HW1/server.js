let { app } = require('./index.js');
app.listen(3010, () => {
  console.log('server running at port', 3010);
});
