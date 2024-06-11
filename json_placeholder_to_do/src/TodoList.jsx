import { useEffect, useState } from 'react'

import styles from './todoList.module.css'

export const TodoList=()=>{

	const [todos, setTodos] = useState([])

	useEffect(()=>{
		fetch('https://jsonplaceholder.typicode.com/todos')
		.then((response)=> response.json())
		.then((todos)=>{
			setTodos(todos)
		})
		.catch((error)=> console.error(error))
	},[])



	return (
		<ul className={styles.todoList}>
			{todos.map(({id, title,completed}) => (
					<li className={styles.item +' '+  (completed ? styles.itemDone: '')} key={id}>{title} </li>
			))}

		</ul>
	)
}
