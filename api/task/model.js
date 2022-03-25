const db = require('../../data/dbConfig');

const find = async () => {
	let result = await db('tasks as t')
		.leftJoin('projects as p', 't.project_id', 'p.project_id')
		.select(
			't.task_completed',
			't.task_notes',
			't.task_description',
			'p.project_name',
			'p.project_description'
		);

	return result;
};

const findById = async (id) => {
	let result = await db('projects as p').where('p.project_id', id);
	return result;
};

const insert = async (task) => {
	let result = await db('tasks as t').insert(task);
	let findNewTask = await db('tasks as t').where('task_id', result);
	return findNewTask;
};

module.exports = { find, findById, insert };
