import { ref, set } from "firebase/database";
import { db } from "../firebase";
import { useState } from "react";

export const useRequestUpData = (
	editingTodoValue,
	setEditingTodoId,
	setEditingTodoValue
) => {
	const [updating, setUpdating] = useState(false);

	const requestSaveEditedTask = (editingTodoId) => {
		setUpdating(true);
		const todoDbRaf = ref(db, `todos/${editingTodoId}`);

		set(todoDbRaf, {
			title: editingTodoValue,
			completed: false,
		})
			.then((response) => {
				console.log(
					"ответ сервера на изменение товара товара ",
					response
				);
				setEditingTodoId(null);
				setEditingTodoValue("");
			})
			.catch((error) => console.error(error))
			.finally(() => setUpdating(false));
	};
	return {
		updating,
		requestSaveEditedTask,
	};
};
