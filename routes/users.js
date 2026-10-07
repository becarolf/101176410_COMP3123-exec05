const express = require("express");
const fs = require("fs");

const router = express.Router();

/*
- Return all details from user.json file to client as JSON format
*/
router.route("/profile").get((request, response) => {
    const data = fs.readFileSync("./user.json", "utf8");
    const user = JSON.parse(data);

    response.json(user);
});

/*
- Modify /login router to accept username and password as JSON body parameter
- Read data from user.json file
- If username and password is valid then send response as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If password is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.route("/login").post((request, response) => {
    const username = request.body.username;
    const password = request.body.password;

    const data = fs.readFileSync("./user.json", "utf8");
    const user = JSON.parse(data);

    if (username !== user.username) {
        response.json({
        status: false,
        message: "User Name is invalid",
        });
    } else if (password !== user.password) {
        response.json({
        status: false,
        message: "Password is invalid",
        });
    } else {
        response.json({
        status: true,
        message: "User Is valid",
        });
    }
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.route("/logout/:username").get((request, response) => {
    const username = request.params.username;

    response.send(`<b>${username} successfully logout.</b>`);
});

module.exports = router;
