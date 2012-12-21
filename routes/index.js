
/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('index', { str1: 'Foo', str2: 'Bar' });
};
