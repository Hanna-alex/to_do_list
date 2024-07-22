import { useState } from 'react';
import { validateTask } from '../functions/validateTask';

export const useRequestAddTask = (
	newTitle,
	setNewTitle,
	tasks,
	setTasks,
	setErrorMessage,
	setIsOpenAddForm
) => {
	const [isAdding, setAdding] = useState(false);

	const addTask = (e) => {
		e.preventDefault();
		const trimmedTitle = newTitle.trim();
		setNewTitle(trimmedTitle);
		const error = validateTask(trimmedTitle, tasks);

		if (error) {
			setErrorMessage(error);
			return;
		}

		setAdding(true);
		fetch('http://localhost:3005/todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: trimmedTitle,
				completed: false,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				setTasks([...tasks, data]);
				setNewTitle('');
				setErrorMessage('');
				setIsOpenAddForm(false);
			})
			.catch((error) => console.error('Error adding task:', error))
			.finally(() => setAdding(false));
	};

	return {
		isAdding,
		addTask,
	};
};
