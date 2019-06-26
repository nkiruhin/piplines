'use strict';
const express = require('express');
const router = express.Router();
const { getUsername, setUsername } = require('../controllers/users');

/* GET users listing. */
router.get('/', async function (req, res) {
    await getUsername(req, res);
});
/* POST set username */
router.post('/', async function (req, res) {
    await setUsername(req, res);
});
module.exports = router;
