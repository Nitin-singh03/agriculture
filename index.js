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



app.get('/product/:id', (req, res) => {
    const productId = req.params.id;
    
    // Query the database to get the product details
    const query = 'SELECT * FROM products WHERE id = ?';
    
    connection.query(query, [productId], (err, results) => {
      if (err) {
        return res.status(500).send('Server Error');
      }
  
      if (results.length === 0) {
        return res.status(404).send('Product Not Found');
      }
      
      const product = results[0];
      
      // Render the product detail page with the product data
      res.render('product', {
        product: product
      });
    });
  });
  
  app.get('/contract/:id', (req, res) => {
    const productId = req.params.id;
    
    // Query the database to get the product details
    const query = 'SELECT * FROM contract_farming WHERE id = ?';
    
    connection.query(query, [productId], (err, results) => {
      if (err) {
        return res.status(500).send('Server Error');
      }
  
      if (results.length === 0) {
        return res.status(404).send('Product Not Found');
      }
      
      const con = results[0];
      
      // Render the product detail page with the product data
      res.render('contractor', {
        contract: con
      });
    });
  });

app.get('/', (req, res) => {
    const sql = 'SELECT * FROM products';
    connection.query(sql, (err, results) => {
        if (err) throw err;

        // Group products by category
        const groupedProducts = results.reduce((acc, product) => {
            if (!acc[product.category]) {
                acc[product.category] = [];
            }
            acc[product.category].push(product);
            return acc;
        }, {});

        // Render the EJS template with grouped products
        res.render('index2.ejs', { groupedProducts, check: 0 });
    });
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
            const sql = 'SELECT * FROM products';
            connection.query(sql, (err, results) => {
                if (err) throw err;
        
                // Group products by category
                const groupedProducts = results.reduce((acc, product) => {
                    if (!acc[product.category]) {
                        acc[product.category] = [];
                    }
                    acc[product.category].push(product);
                    return acc;
                }, {});
        
                // Render the EJS template with grouped products
                res.render('index2.ejs', {user, groupedProducts, check: 1 });
            });
            // res.render("index2.ejs", { user, check: 1 });
        } else {
            res.send('User not found.');
        }
    });
});

app.get("/user/:id/profile", (req, res) => {
    let { id } = req.params;

    let q = 'SELECT * FROM users WHERE id = ?';
    connection.query(q, [id], (err, user) => {
        if (err) {
            console.log(err);
            res.send("Some error occurred while fetching the user's profile.");
        } else {
            res.render("profile.ejs", { user: user[0] });  // Assuming the query returns one user
        }
    });
});


app.get('/contract_search', (req, res) => {
    const query = req.query.query || '';
    const sort = req.query.sort || '';
  
    // Base SQL query
    let sql = 'SELECT * FROM contract_farming WHERE constructor_name LIKE ? OR district LIKE ?';
    
    // Adding sorting to SQL query based on user selection
    if (sort === 'small-large') {
      sql += ' ORDER BY area ASC';
    } else if (sort === 'large-small') {
      sql += ' ORDER BY area DESC';
    }
    
    // Execute query with parameters
    connection.query(sql, [`%${query}%`, `%${query}%`], (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).send('Server error');
        return;
      }
      
  
      // Render the results using EJS template
      res.render('contractor_search', { 
        contracts: results,
        query: query,
        sort: sort
      });
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


// Route to handle the form submission and update the user





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



app.get('/search', (req, res) => {
    const searchQuery = req.query.query || '';
    const sort = req.query.sort || '';
    const district = req.query.district || 'all';
    const company = req.query.company || 'all';

    let query = `SELECT * FROM products WHERE (category LIKE ? OR type LIKE ?)`;
    let queryParams = [`%${searchQuery}%`, `%${searchQuery}%`];

    if (sort) {
        if (sort === 'low-high') {
            query += ` ORDER BY price ASC`;
        } else if (sort === 'high-low') {
            query += ` ORDER BY price DESC`;
        }
    }

    connection.query(query, queryParams, (err, results) => {
        if (err) throw err;

        const companyQuery = `SELECT DISTINCT company_name FROM products`;
        const districtQuery = `SELECT DISTINCT seller_district FROM products`;

        connection.query(companyQuery, (err, companies) => {
            if (err) throw err;

            connection.query(districtQuery, (err, districts) => {
                if (err) throw err;

                res.render('search_result', { 
                    products: results,
                    companies: companies.map(c => c.company_name),
                    districts: districts.map(d => d.seller_district),
                    query: searchQuery,    // Ensure query is included here
                    sort: sort,            // Include sort for selected options
                    district: district,    // Include selected district
                    company: company       // Include selected company
                });
            });
        });
    });
});


app.get("/predict", (req, res) =>{
    res.render("analyzer.ejs");
})

// app.patch("/user/:id", (req, res) => {
//     let { id } = req.params;
//     res.render("index.ejs",{id});
// });


// Retrieve products from the database
app.get('/search', (req, res) => {
    const query = req.query.query;
    const sort = req.query.sort;
    
    // Retrieve products from the database
    let filteredProducts = getProductsFromDatabase(); // Assume this function fetches all products
    
    // Apply sorting
    if (sort === 'low-high') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sort === 'high-low') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }
    
    // Render results
    res.render('searchResults', { products: filteredProducts, query, sort });
});
      
app.patch('/user/:id', (req, res) => {
    const { id } = req.params;
    const { name, number, email, aadhar, district, currentPassword, newPassword, confirmPassword } = req.body;
    
    console.log('Update request:', { name, number, email, aadhar, district, currentPassword, newPassword, confirmPassword });

    // Verify the user's current password
    const getUserQuery = 'SELECT * FROM users WHERE id = ?';

    connection.query(getUserQuery, [id], (err, result) => {
        if (err) {
            console.error('Error fetching user for validation:', err);
            return res.send('An error occurred. Please try again.');
        }

        if (result.length === 0) {
            return res.send('User not found.');
        }

        const user = result[0];
        console.log('Fetched user from DB:', user);

        // Validate the current password
        if (currentPassword !== user.password) {
            return res.send('Incorrect current password. Update failed.');
        }

        // Validate new password and confirmation
        let passwordToUpdate = user.password;  // Keep the old password by default

        if (newPassword) {
            if (newPassword !== confirmPassword) {
                return res.send('New password and confirmation do not match.');
            }
            passwordToUpdate = newPassword;
        }

        // Proceed with updating the user's details
        const updateQuery = `
            UPDATE users 
            SET username = ?, Pnumber = ?, email = ?, aadhar = ?, district = ?, password = ? 
            WHERE id = ?
        `;
        const updateValues = [name, number, email || null, aadhar, district, passwordToUpdate, id];

        connection.query(updateQuery, updateValues, (err, result) => {
            if (err) {
                console.error('Error updating user:', err);
                return res.send('An error occurred while updating. Please try again.');
            }

            res.redirect(`/user/${id}`);
        });
    });
});






























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
