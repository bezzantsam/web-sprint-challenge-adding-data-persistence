// build your `Project` model here
const db = require('../../data/dbConfig');

const find = () => {
	return db('projects');
};

const create = async (project) => {
	const result = await db('projects').insert(project);
	return findById(result);
};

const findById = (id) => {
	return find().where({ project_id: id }).first();
};

module.exports = {
	find,
	create,
	findById,
};