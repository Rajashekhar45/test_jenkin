const express = require("express");

const cors = require("cors");
const cookieSession = require("cookie-session");
const dotenv = require("dotenv");
dotenv.config();
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars') ;
const exphbs = require('express-handlebars');
var path = require('path');
const app = express();
app.use(fileUpload());

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views',  path.join(__dirname, 'app', 'utils','templates'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors({  origin:[   
    'http://localhost:8083',  
    "http://localhost:3000",
    "http://localhost:3002",
    "https://dev.skolrup.com",
    "https://www.dev.skolrup.com",
    "http://www.dev.skolrup.com",	
    "http://dev.skolrup.com",  
], }));
//
app.use(express.json({limit: '50mb'}));

app.use(express.urlencoded({limit: '50mb', extended: true }));
app.use(
  cookieSession({
    name: "oxy-api",
    keys: ["COOKIE_SECRET"], 
    httpOnly: true,
    sameSite: 'strict'
  })
);


//const server = http.createServer(app);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Oxytal World." });
});
app.use("/employees",require('./app/routes/employee.route.js'));
const PORT = process.env.PORT;
var server = app.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}`);
});

// set port, listen for requests 
const 
swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express"),
swaggerDoc = require("./swagger.json");
const swaggerUiOptions = {
  explorer: true
};
app.use(
  "/api-docs",  
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDoc,swaggerUiOptions)  
);



// Function to list all routes
function listRoutes(app) {
  app._router.stack.forEach(middleware => {
      if (middleware.route) { // Routes registered directly on the app
          console.log(middleware.route.path, middleware.route.methods);
      } else if (middleware.name === 'router') { // Router middleware
          middleware.handle.stack.forEach(handler => {
              if (handler.route) {
                  console.log(handler.route.path, handler.route.methods);
              }
          });
      }
  });
}

listRoutes(app);