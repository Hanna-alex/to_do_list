import { useState } from "react";
import { ref, remove } from "firebase/database";
import { db } from "../firebase";

export const useRequestDeleteData = () => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDeleteTask = (deleteTotoId) => {
		setIsDeleting(true);

		const todoDbRef = ref(db, `todos/${deleteTotoId}`);
		remove(todoDbRef)
			.then((response) => {
				console.log("Удален элемент ", response);
			})
			.finally(() => setIsDeleting(false));
	};
	return {
		isDeleting,
		requestDeleteTask,
	};
};
