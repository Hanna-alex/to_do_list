import React from 'react';
import PropTypes from 'prop-types';
import styles from './editingModal.module.css';
import { Button } from './elems/Button';

export const EditingModal = ({ title, setTitle, saveTask, cancelEdit }) => {
	return (
		<div className={styles.modal}>
			<form className={styles.changeFormTask}>
				<h2 className={styles.changeFormTaskTitle}>Изменить задачу:</h2>

				<input
					type='text'
					value={title}
					className={styles.changeInput}
					onChange={(e) => setTitle(e.target.value)}
				/>

				<Button btnFn={saveTask} classbtn={styles.changeFormButton}>
					Сохранить
				</Button>
				<Button btnFn={cancelEdit} classbtn={styles.changeFormButton}>
					Отмена
				</Button>
			</form>
		</div>
	);
};

EditingModal.propTypes = {
	title: PropTypes.string,
	setTitle: PropTypes.string,
	saveTask: PropTypes.func,
	cancelEdit: PropTypes.func,
};
