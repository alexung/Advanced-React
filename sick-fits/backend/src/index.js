const cookieParser = require("cookie-parser");
// this is the entrypoint to our application, so req .env to get all var's you need
require("dotenv").config({ path: ".env" });
const createServer = require("./createServer");
const db = require("./db");

const server = createServer();

// TODO use express middleware to handle cookies.
// NOTE: middleware is a function that happens between request and response
/* 

REQ /dogs.html

in the middle, you might want to...
1. verify auth
2. transform the dogs
3. etc

RES /[dog1, dog2]

*/
server.express.use(cookieParser()); // makes cookies a parsable obj, as opposed to a long string
// TODO use express middleware to populate current user

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  deets => {
    console.log(`Server is now running on port http://localhost:${deets.port}`);
  }
);
