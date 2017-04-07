/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('tip', {
    title: 'Tips'
  });
};
