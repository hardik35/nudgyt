const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), ".env.staging") });

// const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
// const { URLS } = require("./constants");

(async () => {
  const app = require("express")();

//   app.use(helmet());
  app.use(cors());
  app.use(bodyParser.json());

//   const postgresDriver = require("./drivers/postgresDriver");
//   await postgresDriver.initialise();

//   const userRouter = require("./routes/users/routes");
//   const gamesRouter = require("./routes/games/routes");

//   app.use(URLS.ROUTES.USERS.BASE_URL, userRouter);
//   app.use(URLS.ROUTES.GAMES.BASE_URL, gamesRouter);

  const postgresDriver = require("./drivers/postgresDriver");
  await postgresDriver.initialise();
  // Require our routes into the application.
  require('./routes')(app);

  app.get('*', (req, res) => res.status(400).send({
    message: 'not found',
  }));

  const PORT = process.env.PORT;
  app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
})();

