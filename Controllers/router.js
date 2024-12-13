import express from "express";
import { TaskModel } from "../models.js";  // Import the TaskModel
import { connect } from "../dbConfig.js";  // Import the connect function to initialize DB connection

// Initialize DB connection
connect();

const router = express.Router();

// Get all tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await TaskModel.find();
        res.send(tasks);
    } catch (err) {
        console.log("Error while getting tasks", err);
        res.status(400).send("Error while fetching tasks");
    }
});

// Create a new task
router.post("/", async (req, res) => {
    try {
        const { name, desc, deadline, completed } = req.body;

        const newTask = new TaskModel({
            name,
            createdAt: Date.now(),
            desc,
            deadline,
            completed
        });

        const result = await newTask.save();
        res.status(201).send(result);  // Return created task
    } catch (err) {
        console.log(err);
        res.status(400).send("Task not saved");
    }
});

// Update a task
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { name, desc, deadline, completed } = req.body;

        const updatedTask = await TaskModel.findByIdAndUpdate(
            id,
            { $set: { name, desc, deadline, completed, createdAt: Date.now() } },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.status(200).json({ message: "Task Updated Successfully", updatedTask });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete a task
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedTask = await TaskModel.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.status(200).json({ message: "Task Deleted Successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
