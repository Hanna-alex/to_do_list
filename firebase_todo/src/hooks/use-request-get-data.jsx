import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../firebase"; //

export const useRequestGetData = () => {
	const [dataTodos, setDataTodos] = useState({});
	const [todosList, setTodosList] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const dbRef = ref(db, "todos");
		return onValue(dbRef, (snapshot) => {
			const loadedTodos = snapshot.val() || {};
			if (!loadedTodos || loadedTodos.length === 0) {
				setDataTodos({});
				setTodosList({});
			} else {
				setDataTodos(loadedTodos);
				setTodosList(loadedTodos);
			}
			setIsLoading(false);
		});
	}, []);

	return {
		isLoading,
		dataTodos,
		todosList,
		setTodosList,
	};
};
