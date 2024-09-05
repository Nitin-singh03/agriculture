const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));

// Establish MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'agroweb',
    password: 'Qwerty@123'
});

// Function to generate a random user using faker
let getRandomUser = () => {
    return {
        userId: faker.string.uuid(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
};

app.get("/", (req, res) => {
    // let q = "SELECT count(*) as count FROM user";
    // connection.query(q, (err, result) => {
    //     if (err) {
    //         console.log(err);
    //         res.send("some error in page");
    //     } else {
    //         let count = result[0].count;  // Correct reference to the alias
    //         res.render("home", { count });  // Render the 'home.ejs' view with 'count'
    //     }
    // });
    res.render("index.ejs");
});

app.get("/user", (req, res) => {
    let q = "SELECT * FROM user";
    connection.query(q, (err, user) => {
        if (err) {
            console.log(err);
            res.send("some error in page");
        } else {
            res.render("showusers.ejs", {user});  // Render the 'showusers.ejs' view with 'users'
        }
    });
});

app.get("/signup", (req, res) =>{
    res.render("SignUp.ejs");
})

app.get("/login", (req, res) =>{
    res.render("LogIn.ejs");
})

app.get("/predict", (req, res) =>{
    res.render("home.ejs");
})

app.get("/user/:id/edit", (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM user WHERE id = '${id}'`;
    connection.query(q, (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Some error in page");  // Return to prevent further code execution
        }

        let user = result[0];
        res.render("edit.ejs", { user });  // Render the 'edit.ejs' view with the 'user' object
    });
});

app.patch("/user/:id", (req, res) => {
    let { id } = req.params;
    let { password: formpass, username: newUsername } = req.body;  // Fixed variable names
    let q = `SELECT * FROM user WHERE id = ?`;
    
    // First, fetch the user by id to validate the password
    connection.query(q, [id], (err, result) => {
        if (err) {
            console.log(err);
            return res.send("Some error in fetching the user");  // Handle error gracefully
        }

        let user = result[0];

        // Check if the entered password matches the stored password
        if (formpass !== user.password) {
            return res.send("WRONG password");  // Return to prevent further code execution
        }

        // If password matches, proceed with updating the username
        let q2 = `UPDATE user SET username = ? WHERE id = ?`;

        connection.query(q2, [newUsername, id], (err, result) => {
            if (err) {
                console.log(err);
                return res.send("Some error in updating the user");  // Handle error gracefully
            }

            // Redirect or send a response after successful update
            res.redirect("/user");  // Redirect to the user list or another appropriate page
        });
    });
});


app.listen("8080", () => {
    console.log("server is listening on port 8080");
});

// To properly close the connection when the app shuts down
process.on('SIGINT', () => {
    console.log('Closing the MySQL connection');
    connection.end();
    process.exit();
});
