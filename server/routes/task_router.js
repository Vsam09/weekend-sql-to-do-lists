const express = require('express');
const router = express.Router();
const pg = require('pg');

//DB Connection
const pool = new pg.Pool({
    database: 'tasks',        
    host: 'localhost',
    port: 5432
});

// GET
router.get('/', (req, res) => {
    let sqlQuery = `
        SELECT * FROM "tasks"
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
router.post('/', (req, res) => {
    let sqlQuery = `
        --Add a new task to the DB
        INSERT INTO "tasks"
            ("task", "date")
        VALUES
            --prevent sql injections 
           ($1, $2)
    `;
    let sqlParams = [
        req.body.task,  //$1
        req.body.date   //$2
        
    ];
    console.log('sqlQuery:', sqlQuery);

    //Send the query to the DB
    pool.query(sqlQuery, sqlParams)
            .then((dbRes) => {
                //DB is happy
                //we're happy
                //everyone is happy
                res.sendStatus(201); //201 = created
            })
            .catch ((err) => {
                console.log('POST error', err)
                res.sendStatus(500);
            })

});
//PUT
router.put('/:id', (req, res) => {
    console.log(req.params.id);
    console.log(req.body.task);
    const sqlQuery = `
    UPDATE "tasks"
    SET "task" = $1
    WHERE "id" = $2
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