const express = require('express');
const resourcesRouter = express.Router();
const Resources = require('./model');

resourcesRouter.get('/', (req, res) => {
	Resources.find().then((resources) => {
		res.status(200).json(resources);
	});
});

resourcesRouter.post('/', (req, res) => {
	const { resource_name } = req.body;
	Resources.findByName(resource_name).then((exist) => {
		if (exist.length > 0) {
			res.status(400).json('User already exists!');
		} else {
			Resources.create(req.body).then((resource) => {
				Resources.findById(resource).then((newResource) => {
					res.status(201).json(newResource[0]);
				});
			});
		}
	});
});

module.exports = resourcesRouter;
