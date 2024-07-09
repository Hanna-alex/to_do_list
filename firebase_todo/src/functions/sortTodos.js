export const sortTodos = (isSort, todos) => {

	if (!isSort) return todos;
	const sortedTodosArr = Object.entries(todos).sort((a, b) =>
		a[1].title.localeCompare(b[1].title)
	)

	return Object.fromEntries(sortedTodosArr)
};
