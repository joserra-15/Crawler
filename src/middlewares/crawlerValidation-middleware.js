function crawlerValidation(req, res, next) {
  const { pageNumber } = req.params;

  if (!pageNumber) {
    req.params.pageNumber = 1;
  } else if (!parseInt(pageNumber)) {
    return res.status(400).send('Need a number');
  }
  next();
}

module.exports = { crawlerValidation };
