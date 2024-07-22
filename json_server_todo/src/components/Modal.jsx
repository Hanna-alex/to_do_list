import React from 'react'
import PropTypes from 'prop-types'
import styles from './modal.module.css'
import { Button } from './Button'


export const Modal = ({ value, setValue, saveTaskFn, editingTaskId, cancelFn })=>{

	return (
		<div className={styles.modal}>
			<form className={styles.changeFormTask}>
				<h2 className={styles.changeFormTaskTitle}>Изменить задачу:</h2>
				<input
					type="text"
					value={value}
					className={styles.changeInput}
					onChange={(e) => setValue(e.target.value)}
				/>
				<Button btnFn={() => saveTaskFn(editingTaskId)} classbtn={styles.changeFormButton}>
					Сохранить
				</Button>

				<Button btnFn={cancelFn} classbtn={styles.changeFormButton}>Отмена</Button>
			</form>
				</div>

	)

}

Modal.propTypes = {
value: PropTypes.string,
setValue: PropTypes.func,
saveTaskFn: PropTypes.func,
editingTaskId: PropTypes.number,
cancelFn: PropTypes.func
}

