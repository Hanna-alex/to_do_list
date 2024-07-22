import { useState, useEffect } from 'react';

export const useRequestGetTasks = (setTasks) => {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch('http://localhost:3005/todos')
			.then((response) => response.json())
			.then((data) => {
				setTasks(data);
				console.log('get tasks ', data);
			})
			.catch((error) => console.error('Error fetching tasks:', error))
			.finally(() => setIsLoading(false));
	}, [setTasks]);

	return {
		isLoading,
	};
};
