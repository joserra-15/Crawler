const crawlerValidation = (req, res, next) => {
  const pageNumber = req.params.pageNumber;

  if (!pageNumber) {
    req.params.pageNumber = '1';
  } else if (!parseInt(pageNumber)) {
    res.status(400).send('Need a number');
  }

  next();
};

module.exports = { crawlerValidation };
