function crawler(req, res) {
  console.log(req.params);
  res.status(200).send('hola');
}

module.exports = {
  crawler,
};
