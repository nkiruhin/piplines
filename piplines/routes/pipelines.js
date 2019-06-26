'use strict';
const express = require('express');
const router = express.Router();
const { getPipelines, getPipeline, addTask, addPipe, runPipeline, deleteTask, calcAverageTime } = require('../controllers/pipelines');

/* GET pipe listing. */
router.get('/', async function (req, res) {
    if (req.app.locals.username === '') {
        res.redirect('../users');
    }
    await getPipelines(req, res);
});

/* POST add task to pipe */
router.post('/addTask', async function (req, res) {
    await addTask(req, res);
});
/* POST delete task from pipeline */
router.post('/deleteTask', async function (req, res) {
   await deleteTask(req, res);
});
module.exports = router;
/* POST add pipe */
router.post('/', async function (req, res) {
    if (+req.body.id === 1) {
        await addPipe(req, res);
    } else {
        await getPipeline(req, res);
    }
});
/* POST run pipeline */
router.post('/runPipeline',async function (req, res) {
   await runPipeline(req, res);
});
/* POST calculation average time */
router.post('/calcAverageTime', async function (req, res) {
    await calcAverageTime(req, res);
});
module.exports = router;