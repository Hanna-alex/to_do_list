import React from 'react';
import styles from './addFormTask.module.css';
import { Button } from './Button';

export const AddTaskModal = ({
	errorMessage,
	newTitle,
	setNewTitle,
	addTask,
	cancelEdit,
	disabled,
}) => {
	return (
		<div className={styles.overlay}>
			<form className={styles.addFormTask}>
				<h2 className={styles.title}>Добавить задачу:</h2>
				<label className={styles.label}>
					{errorMessage && (
						<label className={styles.error}>{errorMessage}</label>
					)}
					<input
						type='text'
						value={newTitle}
						onChange={(e) => setNewTitle(e.target.value)}
						placeholder='Напишите задачу'
						className={styles.formInput}
					/>
				</label>

				<Button
					btnFn={(e) => addTask(e)}
					disabled={disabled}
					classbtn={styles.changeFormButton}
				>
					Добавить
				</Button>
				<Button btnFn={cancelEdit} classbtn={styles.changeFormButton}>
					Отмена
				</Button>
			</form>
		</div>
	);
};
