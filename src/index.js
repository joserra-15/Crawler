const { app } = require('./server');

const PORT = 4000;

const server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

module.exports = { server };
