'use strict';
const express = require('express');
const router = express.Router();
const { getTasks, addTask, deleteTask } = require('../controllers/tasks');

/* GET task listing. */
router.get('/', async function (req, res) {
    if (req.app.locals.username === '') {
        res.redirect('../users');
    }
    await getTasks(req, res);    
});

/* POST add task */
router.post('/', async function (req, res) {
    await addTask(req, res);
});

/* POST delete task */
router.post('/delete', async function (req, res) {
    await deleteTask(req, res);
});
module.exports = router;