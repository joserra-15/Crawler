const { crawlerValidation } = require('../crawlerValidation-middleware');

describe('Testing crawler validation middleware', () => {
  test('should return number 1 in pageNumber when req.params.pageNumber is undefine', () => {
    const req = { params: {} };
    const next = jest.fn();

    crawlerValidation(req, {}, next);

    expect(next).toHaveBeenCalled();
    expect(req.params.pageNumber).toBe(1);
  });

  test('should return pageNumber', () => {
    const number = 5;
    const req = { params: { pageNumber: number } };
    const next = jest.fn();

    crawlerValidation(req, {}, next);

    expect(next).toHaveBeenCalled();
    expect(req.params.pageNumber).toBe(number);
  });

  test('should return message error with not number', () => {
    const value = 'hello';
    const req = { params: { pageNumber: value } };
    const res = {};
    res.status = jest.fn(() => res);
    res.send = jest.fn(() => res);

    crawlerValidation(req, res, () => {});

    expect(res.status).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalled();
    expect(res.send).toHaveBeenCalledWith('Need a number');
  });
});
