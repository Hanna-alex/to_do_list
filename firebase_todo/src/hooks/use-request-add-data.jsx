import { useState } from "react";
import { ref, push } from "firebase/database";
import { db } from "../firebase"; //

export const useRequestAdd = (todosList, todo, setTodo) => {
	const [errorMessage, setErrorMessage] = useState("");
	const [isAdding, setAdding] = useState(false);

	const requestAddTodo = (e) => {
		e.preventDefault();
		setErrorMessage("");

		if (!todo) {
			setErrorMessage("Введите задачу");
		} else if (
			Object.entries(todosList).some(
				(existingTodo) => existingTodo[1].title === todo
			)
		) {
			setErrorMessage("Такая задача уже существует");
		} else {
			setAdding(true);

			const todosDbRef = ref(db, "todos");

			push(todosDbRef, {
				title: todo,
				completed: false,
			})
				.then((newTask) => {
					// const updatedTodos = { ...dataTodos, newTask };
					// setDataTodos(updatedTodos);
					// setTodosList(sortTodos(isSortOn, updatedTodos));
					setTodo("");
				})
				.catch((error) => console.error(error))
				.finally(() => setAdding(false));
		}
	};
	return {
		isAdding,
		errorMessage,
		requestAddTodo,
	};
};
