import React, { useState, useMemo } from 'react';
import styles from './todoList.module.css';
import { ModalLoader } from './components/ModalLoader';
import { AddTaskModal } from './components/elems/AddTaskModal';
import { EditingModal } from './components/EditingModal';
import { SearchTask } from './components/SearchForm';
import { Button } from './components/elems/Button';

import { truncateText } from './functions/truncateWord';
import {
	useRequestGetTasks,
	useRequestAddTask,
	useRequestUpDataTask,
	useRequestDeleteTask,
} from './hooks';

export const TodoList = () => {
	const [tasks, setTasks] = useState([]);
	// const [task, setTask] = useState([]);
	const [id, setId] = useState(null);
	const [newTitle, setNewTitle] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [isSortOn, setIsSortOn] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const [isOpenAddForm, setIsOpenAddForm] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [title, setTitle] = useState('');

	const { isLoading } = useRequestGetTasks(setTasks, setIsOpenAddForm);
	const { isAdding, addTask } = useRequestAddTask(
		newTitle,
		setNewTitle,
		tasks,
		setTasks,
		setErrorMessage,
		setIsOpenAddForm
	);
	const { isUpdating, saveTask } = useRequestUpDataTask(
		id,
		title,
		setTitle,
		tasks,
		setTasks,
		setId,
		setIsEditing,
		setErrorMessage
	);

	const { isDeleting, deleteTask } = useRequestDeleteTask(setTasks, tasks);

	const filteredTasks = useMemo(() => {
		return tasks.filter(({ title }) =>
			title.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [tasks, searchTerm]);

	const sortedTasks = useMemo(() => {
		return isSortOn
			? [...filteredTasks].sort((a, b) => a.title.localeCompare(b.title))
			: filteredTasks;
	}, [filteredTasks, isSortOn]);

	const onClickEditingBtn = (id, title) => {
		setId(id);
		setTitle(title);
		setIsEditing(true);
	};

	const isAnyLoading = isLoading || isAdding || isUpdating || isDeleting;

	return (
		<div className={styles.container}>
			{isAnyLoading && <ModalLoader />}

			<div className={styles.menu}>
				<Button
					btnFn={() => setIsOpenAddForm(true)}
					classbtn={styles.formButton}
				>
					Добавить новую задачу
				</Button>

				<SearchTask searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

				<Button
					classbtn={styles.sortButton}
					btnFn={() => setIsSortOn(!isSortOn)}
				>
					{isSortOn ? 'Не сортировать' : 'Сортировать'}
				</Button>
			</div>

			{isOpenAddForm && (
				<AddTaskModal
					errorMessage={errorMessage}
					newTitle={newTitle}
					setNewTitle={setNewTitle}
					addTask={addTask}
					cancelEdit={() => setIsOpenAddForm(false)}
				/>
			)}

			{isEditing && (
				<EditingModal
					title={title}
					setTitle={setTitle}
					saveTask={saveTask}
					cancelEdit={() => setIsEditing(false)}
				/>
			)}

			<ul className={styles.todoList}>
				{sortedTasks.length === 0 ? (
					<span>Список пуст</span>
				) : (
					sortedTasks.map(({ id, title }) => (
						<li key={id} className={styles.task}>
							{truncateText(title)}
							<div>
								<Button
									btnFn={() => onClickEditingBtn(id, title)}
									classbtn={styles.buttonChange}
								>
									Редактировать
								</Button>
								<Button
									btnFn={() => deleteTask(id)}
									classbtn={styles.buttonDelete}
								>
									Удалить
								</Button>
							</div>
						</li>
					))
				)}
			</ul>
		</div>
	);
};
