const express = require("express");
const app = express();
const router = express.Router();

const userRouter = require("./routes/users");

// Allows Express to read JSON body
app.use(express.json());

// Add User Router
app.use("/api/v1/user", userRouter);

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get("/home", (request, response) => {
  response.sendFile(__dirname + "/home.html");
});

app.use("/", router);

/*
Add error handling middleware to handle below error
- Return 500 page with message "Server Error"
*/
app.use((error, request, response, next) => {
  response.status(500).send("Server Error");
});

app.listen(process.env.PORT || 8081);

console.log("Web Server is listening at port " + (process.env.PORT || 8081));
