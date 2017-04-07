/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('mood', {
    title: 'Mood'
  });
};
