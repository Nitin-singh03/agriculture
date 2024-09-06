const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require('uuid');

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));

// Establish MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'users',
    password: 'Qwerty@123'
});

// Function to generate a random user using faker
// let getRandomUser = () => {
//     return {
//         userId: faker.string.uuid(),
//         username: faker.internet.userName(),
//         email: faker.internet.email(),
//         password: faker.internet.password(),
//     };
// };

app.get("/", (req, res) => {
    res.render("index2.ejs", { check: 0 });
});

app.get("/user/:id", (req, res) => {
    let { id } = req.params;

    let userQuery = 'SELECT * FROM users WHERE id = ?';

    connection.query(userQuery, [id], (error, results) => {
        if (error) {
            console.error('Error fetching user details:', error.stack);
            return res.send('An error occurred. Please try again.');
        }

        if (results.length > 0) {
            let user = results[0]; 
            res.render("index2.ejs", { user, check: 1 });
        } else {
            res.send('User not found.');
        }
    });
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

app.post("/signup", (req, res) => {
    let { username, number, email, aadhar, district, password, cpassword } = req.body;

    // Check if passwords match
    if (password !== cpassword) {
        return res.send("Passwords do not match. Please try again.");
    }

    // First, check if the phone number is already in use
    let checkNumberQuery = 'SELECT * FROM users WHERE Pnumber = ?';

    connection.query(checkNumberQuery, [number], (error, results) => {
        if (error) {
            console.error('Error checking phone number:', error.stack);
            return res.send('An error occurred. Please try again.');
        }

        // If the number already exists, send an error message
        if (results.length > 0) {
            return res.send('This phone number is already registered. Please use a different number.');
        }

        // If email is not provided, set it to null
        email = email || null;

        // Proceed with the insertion if the phone number doesn't exist
        let insertQuery = 'INSERT INTO users (id, username, Pnumber, email, aadhar, district, password) VALUES (?, ?, ?, ?, ?, ?, ?)';

        let id = uuidv4();
        connection.query(insertQuery, [id, username, number, email, aadhar, district, password], (error, results) => {
            if (error) {
                console.error('Error inserting data:', error.stack);
                return res.send('An error occurred. Please try again.');
            }

            res.redirect(`/user/${id}`);
        });
    });
});




app.get("/login", (req, res) =>{
    res.render("LogIn.ejs");
})

app.post("/login", (req, res) => {
    let { number, password } = req.body;

    // Query to check if the phone number and password match
    let loginQuery = 'SELECT * FROM users WHERE Pnumber = ? AND password = ?';

    connection.query(loginQuery, [number, password], (error, results) => {
        if (error) {
            console.error('Error during login:', error.stack);
            return res.send('An error occurred. Please try again.');
        }

        // Check if any user matches the provided phone number and password
        if (results.length > 0) {
            // Successful login
            res.redirect(`/user/${results[0].id}`); // You might redirect or render a different page
        } else {
            // Failed login
            res.send('Invalid phone number or password. Please try again.');
        }
    });
});




app.get("/predict", (req, res) =>{
    res.render("home.ejs");
})

// app.patch("/user/:id", (req, res) => {
//     let { id } = req.params;
//     res.render("index.ejs",{id});
// });































// app.get("/user/:id/edit", (req, res) => {
//     let { id } = req.params;
//     let q = `SELECT * FROM user WHERE id = '${id}'`;
//     connection.query(q, (err, result) => {
//         if (err) {
//             console.log(err);
//             return res.send("Some error in page");  // Return to prevent further code execution
//         }

//         let user = result[0];
//         res.render("edit.ejs", { user });  // Render the 'edit.ejs' view with the 'user' object
//     });
// });



// app.patch("/user/:id", (req, res) => {
//     let { id } = req.params;
//     let { password: formpass, username: newUsername } = req.body;  // Fixed variable names
//     let q = `SELECT * FROM user WHERE id = ?`;
    
//     // First, fetch the user by id to validate the password
//     connection.query(q, [id], (err, result) => {
//         if (err) {
//             console.log(err);
//             return res.send("Some error in fetching the user");  // Handle error gracefully
//         }

//         let user = result[0];

//         // Check if the entered password matches the stored password
//         if (formpass !== user.password) {
//             return res.send("WRONG password");  // Return to prevent further code execution
//         }

//         // If password matches, proceed with updating the username
//         let q2 = `UPDATE user SET username = ? WHERE id = ?`;

//         connection.query(q2, [newUsername, id], (err, result) => {
//             if (err) {
//                 console.log(err);
//                 return res.send("Some error in updating the user");  // Handle error gracefully
//             }

//             // Redirect or send a response after successful update
//             res.redirect("/user");  // Redirect to the user list or another appropriate page
//         });
//     });
// });


app.listen("8080", () => {
    console.log("server is listening on port 8080");
});

// To properly close the connection when the app shuts down
process.on('SIGINT', () => {
    console.log('Closing the MySQL connection');
    connection.end();
    process.exit();
});
