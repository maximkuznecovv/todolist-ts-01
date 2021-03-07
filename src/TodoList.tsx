import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    todoListID: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
}

function TodoList(props: TodoListPropsType) {

    const [title, setTitle] = useState<string>('')
    //const [error, setError] = useState<string | null>(null)
    const [error, setError] = useState<boolean>(false)

    const all = () => {
        props.changeFilter('all', props.todoListID)
    }
    const active = () => {
        props.changeFilter('active', props.todoListID)
    }
    const completed = () => {
        props.changeFilter('completed', props.todoListID)
    }
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.todoListID)
        } else {
           // alert('Error!')
            //setError('Title is required!')
            setError(true)
        }
        setTitle('')
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(e.currentTarget.value)
    }
    const removeTodoList = () => props.removeTodoList(props.todoListID)
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addTask()
    }

    const tasks = props.tasks.map(task => {
        const removeTask = () => {
            props.removeTask(task.id, props.todoListID)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
                props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListID)
        }
        return (
            <li className={task.isDone ? 'is-done' : ''}>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={e => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListID)}
                />
                <span>{task.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })


    return (
        <div>
            <h3>{props.title}<button onClick={removeTodoList}>x</button></h3>
            <div>
                <input value={title}
                       onChange={onChangeTitle}
                       onKeyPress={onKeyPressAddTask}
                className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {/*{error && <div className='error-message'>Title is required!</div>}*/}
                {error && <div className={'error-message'}>Title is required!</div>}
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active' : ''}
                        onClick={all}>All
                </button>
                <button className={props.filter === 'active' ? 'active' : ''}
                        onClick={active}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active' : ''}
                        onClick={completed}>Completed
                </button>
            </div>
        </div>

    )
}

export default TodoList