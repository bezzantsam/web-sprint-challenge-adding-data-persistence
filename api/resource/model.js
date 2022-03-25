const db = require('../../data/dbConfig');

const find = () => {
	return db('resources');
};

const create = (resource) => {
	return db('resources').insert(resource);
};

const findByName = (name) => {
	return db('resources').where('resource_name', name);
};

const findById = (id) => {
	return db('resources').where({ resource_id: id });
};

module.exports = { find, create, findByName, findById };
