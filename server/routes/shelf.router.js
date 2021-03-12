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
  console.log(req.body);
  console.log(req.user.id);

  const sqlText = `INSERT INTO "item" ("description", "image_url", "user_id")
  VALUES ($1, $2, $3)`;
  const sqlParams = [req.body.description, req.body.image_url, req.user.id];

  pool
    .query(sqlText, sqlParams)
    .then((dbRes) => {
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
  console.log(req.params.id, 'req.params.id');
  console.log(req.user, 'req.user');

  const userId = req.user.id;
  const itemId = req.params.id;

  const sqlText = ` DELETE FROM "item" 
  WHERE "user_id" = $1 
  AND "id" = $2`;

  const sqlParams = [userId, itemId];

  pool
    .query(sqlText, sqlParams)
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('Error in db delete');
      res.sendStatus(500);
    });
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', rejectUnauthenticated, (req, res) => {
  // Incoming req info
  const userId = req.user.id;
  const itemToUpdate = req.body;

  const sqlText = `UPDATE "item" 
  SET "description" = $3, "image_url" = $4 
  WHERE "id" = $1 AND "user_id" = $2;`;
  const sqlParams = [
    itemToUpdate.id,
    userId,
    itemToUpdate.description,
    itemToUpdate.image_url,
  ];

  pool
    .query(sqlText, sqlParams)
    .then((dbRes) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log('Error in PUT', err);
      res.sendStatus(500);
    });
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
