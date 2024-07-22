import { useState } from 'react';

export const useRequestDeleteTask = (setTasks, tasks) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const deleteTask = (id) => {
		setIsDeleting(true);
		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'DELETE',
		})
			.then(() => {
				setTasks(tasks.filter((task) => task.id !== id));
			})
			.catch((error) => console.error('Error deleting task:', error))
			.finally(() => setIsDeleting(false));
	};

	return {
		isDeleting,
		deleteTask,
	};
};
