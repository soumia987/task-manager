// make API

const express=require("express");
const Task = require("./../models/Task")

const router = express.Router();

//create a new task
router.post('/', async (req, res)=>{
    try {
        const task = new Task({
            title: req.body.title,
            description: req.body.description
        });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});

//display all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        if (tasks.length === 0) {
            return res.status(404).json({error: 'No task to display'});
        }
        res.json(tasks);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

//find task by id
router.get('/:id', async (req, res)=>{
    try {
        const taskByID = await Task.findById(req.params.id)
        if (!taskByID) {
            return res.status(404).json({error: 'Task not found'})
        }
        res.json(taskByID);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

//update task by id
router.put('/:id', async (req, res)=>{
    try {
        const tasks = await Task.find();
        if (tasks.length === 0) {
            return res.status(404).json({error: 'No task to update'});
        }
        else{
            const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                overwrite: true,
            });
            if (!task) {
                return res.status(404).json({error: 'Task not found'})
            }
            res.json(task);
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

//delete task by id 
router.delete('/:id', async (req, res)=>{
    try {
        const tasks = await Task.find();
        if (tasks.length === 0) {
            return res.status(404).json({error: 'No task to delete'});
        } else {
            const task = await Task.findByIdAndDelete(req.params.id);
            if (!task) {
                return res.status(404).json({error: 'Task not found'});
            }
            res.json({message: 'Task deleted successfully'});
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

module.exports = router;