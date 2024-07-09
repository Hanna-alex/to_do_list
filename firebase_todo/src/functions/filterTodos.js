export const filterTodos = (term, todos) => {
	if (!term) return todos;
	return Object.fromEntries(
		Object.entries(todos).filter(([, { title }]) =>
			title.toLowerCase().includes(term.toLowerCase())
		)
	);
};
