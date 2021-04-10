import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./AppOld";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodoListType} from './App';

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

    const todo = useSelector<AppRootStateType, TodoListType>(state => {
        return state.todoLists.filter(todo => todo.id === props.todoListID)[0]
    })

    let dispatch = useDispatch()

    const AddTask = (title: string) => props.addTask(title, props.todoListID)
    const removeTodoList = () => props.removeTodoList(props.todoListID)
    const all = () => props.changeFilter("all", props.todoListID)
    const active = () => props.changeFilter("active", props.todoListID)
    const completed = () => props.changeFilter("completed", props.todoListID)
    const changeTodoListTitle = (title: string) => props.changeTitle(title, props.todoListID)

    const tasks = props.tasks.map(task => {
        const removeTask = () => props.removeTask(task.id, props.todoListID)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListID)
        const changeTaskTitle = (newTitle: string) =>
            props.changeTaskTitle(task.id, newTitle, props.todoListID)
        return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>

                <Checkbox
                    color={"secondary"}
                    checked={task.isDone}
                    onChange={changeTaskStatus}
                />
                {/*<input*/}
                {/*    type="checkbox"*/}
                {/*    checked={task.isDone}*/}
                {/*    onChange={changeTaskStatus}*/}
                {/*/>*/}
                <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                {/*<button onClick={removeTask}>x</button>*/}
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </li>
        )
    })

    return (
        <div>
            <h3>

                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                {/*<button onClick={removeTodoList}>x</button>*/}
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={AddTask}/>
            <ul style={{listStyle: 'none', paddingLeft: '0'}}>
                {tasks}
            </ul>
            <div>
                <Button
                    variant={"contained"}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    size={"small"}
                    //className={props.filter === 'all' ? 'active' : ''}
                    onClick={all}>All
                </Button>
                <Button
                    variant={"contained"}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    size={"small"}
                    //className={props.filter === 'active' ? 'active' : ''}
                    onClick={active}>Active
                </Button>
                <Button
                    variant={"contained"}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    size={"small"}
                    //className={props.filter === 'completed' ? 'active' : ''}
                    onClick={completed}>Completed
                </Button>
            </div>
        </div>

    )
}

export default TodoList