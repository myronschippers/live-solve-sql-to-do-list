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

router.post('/', (req, res) => {
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

router.delete('/', (req, res) => {
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

router.put('/', (req, res) => {
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

module.exports = router;