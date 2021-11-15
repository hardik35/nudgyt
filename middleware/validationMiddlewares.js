const atob = require("atob");
// const { verifyJWT, validatePassword } = require("../utils/authenticationUtils");
// const {getPasswordHashQuery} = require("../routes/users/sqlQueries");
const postgresDriver = require("../drivers/postgresDriver");

const schemaValidationMiddleware = (schema) => {
  return async (req, res, next) => {
    try {
      console.log("a",schema.validate, req.body)
      const value = await schema.validate(req.body);
      console.log(value)
      if (value.error) {
        res.status(400).send(value.error);
        return;
      } else {
        next();
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Schema validation failed. ");
    }
  };
};

// const headerValidationMiddleware = (schema) => {
//   return async (req, res, next) => {
//     try {
//       const value = await schema.validate(req.headers);
//       if (value.error) {
//         res.status(400).send(value.error);
//         return;
//       } else {
//         next();
//       }
//     } catch (err) {
//       console.error(err);
//       res.status(500).send("Schema validation for headers failed. ");
//     }
//   };
// };

// const basicAuthorizationMiddleware = async (req, res, next) => {
//   if (!req.headers.authorization) {
//     res.status(400).send("Authorization failed. ");
//     return;
//   }

//   try {
//     const base64Token = req.headers.authorization.split(' ')[1];
//     const [email, password] = atob(base64Token).split(":");
//     req.user = {
//       email,
//     };
    
//     const query = getPasswordHashQuery();

//     const { rows } = await postgresDriver.query(query, [email]);
//     if (rows.length === 0) {
//       res.status(404).send("User does not exist");
//       return;
//     }
    
//     const passwordHash = rows[0].password_hash;
//     const isPasswordValid = await validatePassword(password, passwordHash);

//     if (!isPasswordValid) {
//       res.status(401).send("Authorization failed. ");
//       return;
//     }

//     next();
//   } catch (exception) {
//     console.error(exception);
//     res.status(500).send("Authorization failed. ");
//   }
// };

// const jwtAuthorizationMiddleware = (req, res, next) => {
//   if (!req.headers.authorization) {
//     res.status(400).send("Authorization failed. ");
//     return;
//   }

//   try {
//     const data = verifyJWT(req.headers.authorization);
//     if (!data.email) {
//       res.status(400).send('Email not provided');
//       return;
//     }

//     req.user = {
//       email: data.email
//     };
//     next();
//   }
//   catch (exception) {
//     console.error(exception);
//     res.status(500).send("Authorization failed. ");
//     return;
//   }
// }

module.exports = {
  schemaValidationMiddleware,
  // headerValidationMiddleware,
  // basicAuthorizationMiddleware,
  // jwtAuthorizationMiddleware,
};
