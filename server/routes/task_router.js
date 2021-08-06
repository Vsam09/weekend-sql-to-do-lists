const { channel } = require('diagnostics_channel');
const express = require('express');
const router = express.Router();
const pg = require('pg');

const pool = new pg.Pool({
    database: 'task',        
    host: 'localhost',
    port: 5432
});

// DB CONNECTION
pool = new pg.Pool({
    database: "task",
    host: 'Localhost',
    port: 5432,
});
// GET
router.get('/', (req, res) => {
    let sqlQuery = `
        SELECT * FROM "task"
    `;
    pool.query(sqlQuery)
    .then((dbRes) => {
        console.log(dbRes.rows);
        res.send(dbRes.rows)
    }).catch((err) => {
        console.log('SQL failed', err)
        res.sendStatus(500);
    })
});

//POST

//PUT
router.put('/', (req, res) => {
    console.log(req.params.id);
    console.log(req.body.task);
    const sqlQuery = `
    UPDATE "task"
    
`;
const sqlParams = [
    req.body.task,          
    req.params.id           
];
pool.query(sqlQuery, sqlParams)
    .then((dbRes) => {
        res.sendStatus(200);
    })
    .catch((err) => {
        console.log('UPDATE err', err);
        res.sendStatus(500);
    })
});
//DELETE





module.exports = router;