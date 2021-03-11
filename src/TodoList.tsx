import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

type TodoListPropsType = {
    todoListID: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeTitle: (newTitle: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
}

function TodoList(props: TodoListPropsType) {

    const AddTask = (title: string) => props.addTask(title, props.todoListID)
    const removeTodoList = () => props.removeTodoList(props.todoListID)
    const all = () => props.changeFilter('all', props.todoListID)
    const active = () => props.changeFilter('active', props.todoListID)
    const completed = () => props.changeFilter('completed', props.todoListID)
    const changeTodoListTitle = (title: string) => props.changeTitle(title, props.todoListID)

    const tasks = props.tasks.map(task => {
        const removeTask = () => props.removeTask(task.id, props.todoListID)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListID)
        const changeTaskTitle = (newTitle: string) =>
            props.changeTaskTitle(task.id, newTitle, props.todoListID)
        return (
            <li className={task.isDone ? 'is-done' : ''}>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={changeTaskStatus}
                />
                <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })

    return (
        <div>
            <h3>

                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <button onClick={removeTodoList}>x</button>
            </h3>
            <AddItemForm addItem={AddTask}/>
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