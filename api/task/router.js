const express = require('express');
const tasksRouter = express.Router();
const Tasks = require('./model');

tasksRouter.get('/', (req, res) => {
	Tasks.find().then((tasks) => {
		let newArray = [];
		tasks.map((task) => {
			newArray.push({ ...task, task_completed: Boolean(task.task_completed) });
		});

		res.status(200).json(newArray);
	});
});

tasksRouter.post('/', (req, res) => {
	const { task_description, project_id } = req.body;
	if (!task_description || !project_id) {
		res
			.status(400)
			.json({ message: 'Task Description and Project ID are required!' });
	} else {
		Tasks.findById(project_id).then((project) => {
			if (project.length > 0) {
				Tasks.insert(req.body).then((task) => {
					// let obj = {
					// 	task_id: task.task_id,
					// 	task_description: task.task_description,
					// 	task_notes: task.task_notes,
					// 	task_completed: Boolean(task.task_completed),
					// };
					res.json(task);
				});
			} else {
				res.status(404).json("Project doesn't exist!");
			}
		});
	}
});

module.exports = tasksRouter;
