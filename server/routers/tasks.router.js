const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "tasks";`

    pool.query(queryText)
        .then((response) => {
            res.send(response.rows);
        })
        .catch((err) => {
            console.log('GET error: ', err);
            res.sendStatus(500);
        });
});

// tested with postman and working :)
router.post('/', (req, res) => {
    const queryText = `INSERT INTO "tasks" ("description", "complete")
                        VALUES ($1, $2);`
    const taskData = req.body;

    pool.query(queryText, [taskData.description, 'false'])
        .then((response) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('POST error: ', err);
            res.sendStatus(500);
        });
});

// DELETE works swimmingly :) (Postman)
router.delete('/delete/:id', (req, res) => {
    const queryText = `DELETE FROM "tasks" WHERE "id"=$1;`
    const taskId = req.params.id;

    pool.query(queryText, [taskId])
        .then((response) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('DELETE error: ', err);
            res.sendStatus(500);
        });
});

// Things get completed, tested with Postman
router.put('/complete/:id', (req, res) => {
    const queryText = `UPDATE "tasks"
                        SET "complete"='true'
                        WHERE "id"=$1;`
    const taskId = req.params.id;

    pool.query(queryText, [taskId])
        .then((response) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('PUT error: ', err);
            res.sendStatus(500);
        });
});

module.exports = router;