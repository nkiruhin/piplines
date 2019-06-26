const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    Name: String,
    AverageTime: Number,
    Author: String
}, {
        timestamps: true
    });
module.exports = mongoose.model('Task', TaskSchema);
module.exports.TaskSchema = TaskSchema;