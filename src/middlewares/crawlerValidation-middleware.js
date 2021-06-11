function crawlerValidation(req, res, next) {
  const { pageNumber } = req.params;
  try {
    if (!pageNumber) {
      req.params.pageNumber = 1;
    } else if (!parseInt(pageNumber)) {
      return res.status(400).send('Need a number');
    }
    next();
  } catch (error) {
    return res.status(400).send(error);
  }
}

module.exports = { crawlerValidation };
