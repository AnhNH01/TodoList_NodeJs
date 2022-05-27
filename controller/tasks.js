const Task = require('../models/Task')
const asyncWrapper = require('../middleware/asyncWrapper')

const {createNewCustomError} = require('../error/customError')

const getAllTasks = asyncWrapper(async (req, res) => {
    var tasks = await Task.find({})
    res.status(200).json({tasks})

})

const getTask = asyncWrapper(async (req, res, next) => {
    const taskId = req.params.id
    if (taskId.match(/^[0-9a-fA-F]{24}$/)) {  // check if the id is a valid object id
        var task = await Task.findById(taskId)
        
        if(!task) 
            return next(createNewCustomError(`No Task with id: ${taskId}`, 404))
    } else {
        return next(createNewCustomError(`No Task with id: ${taskId}`, 404))
    }
    res.status(200).json({task})
})

const createTask = asyncWrapper(async (req, res) => {
    const newTask = await Task.create(req.body)
    res.status(201).json({newTask}) 
})

const updateTask = asyncWrapper(async (req, res, next) => {
    const {id: taskId} = req.params     
    const task = await Task.findOneAndUpdate({_id: taskId}, req.body, {
        new: true,
        runValidators: true
    })

    if (!task) {
        return next(createNewCustomError(`No Task with id: ${taskId}`, 404))
    }

    res.status(200).json({task})
})

const deleteTask = asyncWrapper (async (req, res, next) => {
    const taskId = req.params.id
    if (taskId.match(/^[0-9a-fA-F]{24}$/)) {  // check if the id is a valid object id
        var task = await Task.findByIdAndDelete(taskId)
        
        if(!task) 
            return next(createNewCustomError(`No Task with id: ${taskId}`, 404))
        
    } else {
        return next(createNewCustomError(`No Task with id: ${taskId}`, 404))
    }

    res.status(200).json({task})
})



module.exports = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask
}