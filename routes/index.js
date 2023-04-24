const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

// * WHEN I open API GET routes in Insomnia Core for categories, products, or tags
// * THEN the data for each of these routes is displayed in a formatted JSON
// ? WHEN I test API POST, PUT, and DELETE routes in Insomnia Core
// ? THEN I am able to successfully create, update, and delete data in my database */

module.exports = router;