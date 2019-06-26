const  Task = require('../models/task.model');

const getTasks = async (req, res) => {
    const tasks = await Task.find();
    const author = req.app.locals.username;
    res.render('tasks', { tasks, author });
};
const addTask = async (req,res) => {
    //Create a task
    const task = new Task({
        Name: req.body.Name,
        AverageTime: req.body.AverageTime,
        Author: req.app.locals.username
    });
    // Save task in the database
    await task.save();
    getTasks(req, res);
};
const deleteTask = async (req, res) => {
    await Task.findByIdAndRemove(req.body.id)
    getTasks(res);
};

module.exports = { getTasks, addTask, deleteTask };
