export const validateTask = (title, tasks) => {
	console.log('validateTask ', tasks)
	if (!title.trim()) {
		return 'Название задачи не может быть пустым'

	}
	else if (
		tasks.some((existingTask) => existingTask.title === title.trim())
	) {
		return 'Такая задача уже существует'
	}
	else { return ''; }

}
