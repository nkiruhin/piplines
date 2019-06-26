const Task = require('../models/task.model');
const Pipes = require('../models/pipe.model');
const { exec } = require('child_process');

const getPipelines = async (req, res, pipeline) => {
    let author = req.app.locals.username;
    const pipelines = await Pipes.find({ Author: author });
    const tasks = await Task.find();
    res.render('pipelines', { pipelines, tasks, pipeline });
};
const getPipeline = async (req, res) => {
    const pipeline = await Pipes.findById(req.body.id);
    const tasks = await Task.find();
    res.render('pipeline', { pipeline, tasks });
};

const addTask = async (req,res) => {
    //Add task to pipline
    const task = await Task.findById(req.body.TaskId);
    const pipe = await Pipes.findById(req.body.id);
    pipe.Tasks.push(task);
    await pipe.save();
    getPipeline(req, res);
};
const deleteTask = async (req, res) => {
    //Delete task from pipeline
    const pipe = await Pipes.findById(req.body.id);
    await pipe.Tasks.remove({ "_id": req.body.TaskId });
    await pipe.save();
    getPipeline(req, res);
};
const calcAverageTime = async (req, res) => {
    let sum = 0;
    const pipe = await Pipes.findById(req.body.id);
    for (i=0; i < pipe.Tasks.length; i++) {
        sum += pipe.Tasks[i].AverageTime;
    }
    res.send(`<h3>Average time : ${sum}, ms </h3>`);
};
const runPipeline = async (req, res) => {
    //Run pipeline
    pipelineId = req.body.id;
    const pipe = await Pipes.findById(req.body.id);
    pipe.PipelineRunTime = new Date();
    await pipe.save();
    await exec('dotnet pipe.dll ' + pipelineId,
        (error, stdout) => {
            if (error) {
                console.log(`exec error: ${error}`);
                return;
            }
            if (stdout.search(/End/) !== -1)
                res.send("Pipline is end");
        });
    console.log(`Run ${req.body.id}`);
};

const addPipe = async (req, res) => {
    const pipe = new Pipes({
        Name: req.body.Name,
        Author: req.app.locals.username
    });
    await pipe.save();
    getPipelines(req, res, pipe);
};
module.exports = { getPipelines, getPipeline, addTask, addPipe, runPipeline, deleteTask, calcAverageTime };