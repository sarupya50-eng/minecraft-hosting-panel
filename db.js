const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database
const db = new sqlite3.Database('minecraft.db', (err) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Close the database connection
process.on('exit', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing the database:', err.message);
        }
    });
});