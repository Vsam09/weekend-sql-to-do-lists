const express = require('express');
const router = express.Router();
const pg = require('pg');

const pool = new pg.Pool({
    database: 'task',        
    host: 'localhost',
    port: 5432
});






module.exports = router;