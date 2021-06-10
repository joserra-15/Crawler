function crawlerValidation(req, res, next) {
  const pageNumber = req.params.pageNumber;

  if (!pageNumber) {
    req.params.pageNumber = 1;
  } else if (!parseInt(pageNumber)) {
    return res.status(400).send('Need a number');
  } else {
    req.params.pageNumber = parseInt(pageNumber);
  }

  return next();
}

module.exports = { crawlerValidation };
