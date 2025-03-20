require('dotenv').config(); 
const express = require('express');
const mysql = require('mysql2');

const app = express();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    
});
const connectdb=async ()=>{
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ' + err.stack);
        return;
    }
    console.log('Connected to the database.');
    return db
});
}

const endconnection=async ()=>{
    db.end((err) => {
        if (err) {
            console.error('Error connecting to the database: ' + err.stack);
            return;
        }
        return db
    });
    }

app.get('/', (req, res) => {
    res.send('Hello, this is your Express server with MySQL connection!');
});

const port = process.env.PORT || 3000;
app.listen(port, async() => {
    await connectdb();
    await endconnection();
    console.log(`Server is running on port ${port}`);
});