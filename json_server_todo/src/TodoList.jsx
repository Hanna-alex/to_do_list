import { useEffect, useState, useMemo } from 'react'
import styles from './todoList.module.css'
import { ModalLoader} from './components/ModalLoader'
import { AddFormTask } from './components/AddFormTask'
import { Modal } from './components/Modal'
import { SearchForm } from './components/SearchForm'
import { Button } from './components/Button'

export const TodoList=()=>{

	const [dataTodos, setDataTodos] = useState([])
	const [todosList, setTodosList] = useState([])
	const [todo, setTodo] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [editingTodoId, setEditingTodoId] = useState(null)
	const [editingTodoValue, setEditingTodoValue] = useState('')
	const [isDeleting, setIsDeleting] = useState(false)
	const [openModal, setOpenModal] = useState(false)
	const [isSortOn, setIsSortOn] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')

	useEffect(()=>{
		setIsLoading(true)
		fetch('http://localhost:3005/todos')
			.then((response)=> response.json())
			.then((todos)=>{
				if(!todos || todos.length === 0){
					setDataTodos([])
					setTodosList([])
				}
				else {
					setDataTodos(todos)
					setTodosList(todos)
				}
			})
			.catch((error)=> console.error(error))
			.finally(() => setIsLoading(false))
	},[])

	const inputNewTodo = ({target}) => {
		const newValue = target.value
		setTodo(newValue)
	}

	const addTodo = (e) => {
		e.preventDefault()
		setIsLoading(true)
		setErrorMessage('')

		if(!todo) {
			setErrorMessage('Введите задачу')
			setIsLoading(false)
		}
		else if(todosList.some(existingTodo => existingTodo.title === todo)) {
			setErrorMessage('Такая задача уже существует')
			setIsLoading(false)
		}
		else {
			fetch('http://localhost:3005/todos', {
					method:'POST',
					headers:{
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ title: todo, completed: false }),
				})
				.then((response) => response.json())
				.then((newTask)=> {
					const updatedTodos = [...dataTodos, newTask]
					setDataTodos(updatedTodos)
					setTodosList(sortTodos(isSortOn, updatedTodos))
					setTodo('')

				})
				.catch((error) => console.error(error))
				.finally (() => setIsLoading(false))
		}
}

	const saveEditedTask = (id) => {
		const updatedTodos = todosList.map(todo => {
			if (todo.id === id) {
				return { ...todo, title: editingTodoValue }
			}
			return todo
	})

		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'PATCH',
			headers: {
				'content-Type': 'application/json',
			},
			body: JSON.stringify({ title: editingTodoValue }),
		})
		.then(() => {
			setDataTodos(updatedTodos)
			setTodosList(sortTodos(isSortOn, updatedTodos))
			setEditingTodoId(null)
			setEditingTodoValue('')
		})
		.catch((error) => console.error(error))
	}

	const deleteTask =(id)=>{
		setIsDeleting(true)

		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'DELETE'
		})
		.then((rawResponse) => rawResponse.json())
		.then(() => {
			const updatedTodos = dataTodos.filter(todo => todo.id !== id)
			setDataTodos(updatedTodos)
			setTodosList(sortTodos(isSortOn, updatedTodos))
		})
		.catch((error) => console.error(error))
		.finally(() => setIsDeleting(false))
	}

	const cancelEdit = () => {
		setEditingTodoId(null)
		setEditingTodoValue('')
		setOpenModal(false)
	}

	const openEditModal = (id, title) => {
		setEditingTodoId(id)
		setEditingTodoValue(title)
		setOpenModal(true)
	}

	const filterTodos = (term, todos) => {
		if (!term) return todos
		return todos.filter(todo => todo.title.toLowerCase().includes(term.toLowerCase()))
	}

	const sortTodos = (isSort, todos) => {
    if (!isSort) return todos;
    return [...todos].sort((a, b) => a.title.localeCompare(b.title))
	}

	const filteredTodos = useMemo(() => filterTodos(searchTerm, dataTodos), [searchTerm, dataTodos])

	useEffect(() => {
    setTodosList(sortTodos(isSortOn, filteredTodos));
  }, [filteredTodos, isSortOn]);



	const clickOnSortedBtn = () => {
		setIsSortOn(!isSortOn)
	}

	return (
		<>
		<SearchForm onChange={(e) => setSearchTerm(e.target.value)} />
		<AddFormTask errorMessage={errorMessage} value={todo} onChange = {inputNewTodo} btnFn={addTodo}/>
		<button className={styles.sortButton} data-sort = { isSortOn } onClick={clickOnSortedBtn}>{isSortOn ? 'Не сортировать' : 'Сортировать'}</button>

		{isLoading && <ModalLoader/>}

		<ul className={styles.todoList}>
			{ todosList.length === 0
			? <span>Список пуст</span>
			: todosList.map(({id, title, completed}) => (
				<li className={`${styles.task} ${(completed ? styles.taskDone : '')}`} key={id} data-completed={completed} value ={title} id={id}>{title}

					<div className={styles.buttonsGroup}>
						<Button btnFn={() => openEditModal(id, title)} classbtn={styles.buttonChange}>
							Изменить
						</Button>
						<Button btnFn={()=> {deleteTask(id)}} classbtn={styles.buttonDelete}>Удалить</Button>
					</div>
				</li>
			))
		}
		</ul>

		{openModal
			? <Modal
				value={ editingTodoValue }
				setValue = { setEditingTodoValue }
				saveTaskFn = {() => saveEditedTask(editingTodoId)}
				editingTodoId = { editingTodoId }
				cancelFn= { cancelEdit }
			/>
			: null
		}

		{isDeleting && <ModalLoader/>}

		</>
	)
}

// json-server --watch src/todos.json --port 3005 --delay 2000
// cd ./json_server_todo
