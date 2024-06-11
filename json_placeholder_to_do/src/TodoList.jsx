import { useEffect, useState } from 'react'
import styles from './todoList.module.css'

export const TodoList=()=>{

	const [todos, setTodos] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	useEffect(()=>{
		setIsLoading(true)
		fetch('https://jsonplaceholder.typicode.com/todos')
		.then((response)=> response.json())
		.then((todos)=>{
			setTodos(todos)
		})
		.catch((error)=> console.error(error))
		.finally(setIsLoading(false))
	},[])

	return (
		<ul className={styles.todoList}>
			{isLoading ?
			<div className={styles.loader}></div>
			:todos.map(({id, title,completed}) => (
					<li className={styles.item +' '+  (completed ? styles.itemDone: '')} key={id}>{title} </li>
			))}

		</ul>
	)
}
