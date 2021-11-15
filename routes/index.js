const {
  schemaValidationMiddleware,
  headerValidationMiddleware,
  basicAuthorizationMiddleware,
  jwtAuthorizationMiddleware,
} = require("../middleware/validationMiddlewares");

const {
  registerUserSchema,
} = require("./schema");

const UsersController = require('../controllers').Users;
// const UsersSubscriptionsController = require('../controllers').UsersSubscriptions;

module.exports = (app) => {
  app.post('/user/register', schemaValidationMiddleware(registerUserSchema), UsersController.registerUser);
  // app.get('/user/:id', UsersController.list);
  // app.post('/subscription', UsersSubscriptionsController.create);
  // app.get('/subscription/:userId', UsersSubscriptionsController.listAllPlans);
  // app.get('/subscription/:userId/:endDate', UsersSubscriptionsController.listActivePlans);
};