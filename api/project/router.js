// build your `/api/projects` router here
const express = require('express');
const projectsRouter = express.Router();
const Projects = require('./model');

projectsRouter.get('/', (req, res) => {
	Projects.find().then((projects) => {
		let newArray = [];
		projects.map((project) => {
			newArray.push({
				...project,
				project_completed: Boolean(project.project_completed),
			});
		});
		res.status(200).json(newArray);
	});
});

projectsRouter.post('/', (req, res) => {
	const { project_name, project_description, project_completed } = req.body;
	if (project_name !== undefined) {
		let obj = {
			project_name,
			project_description,
			project_completed,
		};

		if (!project_completed) {
			obj.project_completed = false;
		}

		Projects.create(obj).then((project) => {
			res.status(201).json(project);
		});
	} else {
		res.status(400).json('Bad Request!');
	}
});

module.exports = projectsRouter;
