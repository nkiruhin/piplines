const mongoose = require('mongoose');
const Task = require('../models/task.model');

const PipeSchema = mongoose.Schema({
    Name: String,
    Tasks: [Task.TaskSchema],
    Athor: String,
    PipelineRunTime:Date
}, {
        timestamps: true
    });
module.exports = mongoose.model('Pipelines', PipeSchema);