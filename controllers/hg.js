/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('hg', {
    title: 'Happy Genes'
  });
};
