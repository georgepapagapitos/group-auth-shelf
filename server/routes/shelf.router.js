const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * Get all of the items on the shelf
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  //res.sendStatus(200); // For testing only, can be removed
  console.log('user', req.user.id);

  const sqlText = `SELECT * FROM "item"
  WHERE "user_id" = $1;`;

  pool
    .query(sqlText, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error, 'ERROR GET ALL ITEMS');
      res.sendStatus(500);
    });
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  // endpoint functionality
  console.log(req.body);
  console.log(req.user.id);

  const sqlText = `INSERT INTO "item" ("description", "image_url", "user_id")
  VALUEs ($1, $2, $3)`;
  const sqlParams = [req.body.description, req.body.image_url, req.user.id];

  pool
    .query(sqlText, sqlParams)
    .then((results) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('error in POST', err);
      res.sendStatus(500);
    });
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  // endpoint functionality
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', rejectUnauthenticated, (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', rejectUnauthenticated, (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', rejectUnauthenticated, (req, res) => {
  // endpoint functionality
});

module.exports = router;
