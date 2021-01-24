import { v4 as uuidv4 } from 'uuid';

export const generateBoard = () => {
		const tasks = 
		[
			{
				id: uuidv4(),
				title: 'Pending Task',
				issues: [
					{ id: uuidv4(), title: 'Task 1', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
					{ id: uuidv4(), title: 'Task 2', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
					{ id: uuidv4(), title: 'Task 3', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' }
				]
			},
			{
				id: uuidv4(),
				title: 'In Progress',
				issues: [
					{ id: uuidv4(), title: 'Task 1', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry..' },
				]
			},
			{
				id: uuidv4(),
				title: 'Compeleted',
				issues: [
					{ id: uuidv4(), title: 'Task 1', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
					{ id: uuidv4(), title: 'Task 2', description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' }
				]
			}
		];
		return tasks;
};
