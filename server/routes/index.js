const flightsRoutes = require('./flights');
const profileRoutes = require('./profile');

const constructorMethod = (app) => {
  app.use('/flights', flightsRoutes);
  app.use('/profile',profileRoutes);
  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;