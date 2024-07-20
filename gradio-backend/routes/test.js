import mysql from 'mysql2';
import bcrypt from 'bcrypt';
const saltRounds = 10;

// Create a connection to the database
const db = mysql.createConnection({
    host: "rtzsaka6vivj2zp1.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "d5ji0rn504phmt5l",
    password: "eeco09aqlnrjzq0b",
    database: "rz8o4nx4iq2bdryg",
    debug: true
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');

    const name = 'waleed';
    const email = 'mwfarrukh@gmail.com';
    const password = 'salad321';
    const sql = "INSERT INTO login(`name`,`email`,`password`) VALUES (?, ?, ?)";

    bcrypt.hash(password.toString(), saltRounds, (err, hash) => {
        if (err) {
            console.error("Error hashing password:", err);
            return;
        }

        const values = [
            name,
            email,
            hash
        ];

        console.log("Prepared SQL query:", sql);
        console.log("Values to be inserted:", values);

        db.execute(sql, values, (err, result) => {
            if (err) {
                console.error("Error inserting data in server:", err);
                return;
            }
            console.log("Insert successful:", result);
        });
    });
});
