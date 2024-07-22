import React from 'react';
import styles from './addFormTask.module.css'
import { Button } from './Button'

export const AddFormTask = ({errorMessage, value, onChange, btnFn})=>{

	return (
		<form  className={styles.addFormTask}>
			{errorMessage ? <label className={styles.error}>{errorMessage}</label> : ''}
			<input type='text'
			name ='task'
			value = {value}
			placeholder = 'Напишите задачу'
			onChange = {onChange}
			className={styles.formInput}>
			</input>

			<Button btnFn={btnFn} classbtn={styles.formButton}>Добавить</Button>
		</form>
	)
}
