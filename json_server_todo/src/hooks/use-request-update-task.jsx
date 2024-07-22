import { useState } from 'react';
import { validateTask } from '../functions/validateTask';

export const useRequestUpDataTask = (
	id,
	title,
	setTitle,
	tasks,
	setTasks,
	setId,
	setIsEditing,
	setErrorMessage
) => {
	const [isUpdating, setIsUpdating] = useState(false);

	const saveTask = (e) => {
		e.preventDefault();
		console.log('tasks', tasks);

		const error = validateTask(title, tasks);

		if (error) {
			setErrorMessage(error);
			console.log('Validation error:', error);
			return;
		}

		setIsUpdating(true);
		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title: title, completed: false }),
		})
			.then((response) => response.json())
			.then((data) => {
				setTasks((prevTasks) =>
					prevTasks.map((item) => (item.id === id ? data : item))
				);
				setTitle('');
				setId(null);
				setErrorMessage('');
			})
			.catch((error) => {
				console.error('Error saving task:', error);
				setErrorMessage('Не удалось сохранить задачу. Попробуйте еще раз.');
			})
			.finally(() => {
				setIsUpdating(false);
				setIsEditing(false);
			});
	};

	return {
		isUpdating,
		saveTask,
	};
};
