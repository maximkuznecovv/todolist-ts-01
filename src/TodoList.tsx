import React, {useCallback} from "react";
import {FilterValuesType, TasksType} from "./AppOld";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

type TodoListPropsType = {
    todoListID: string
    title: string
    filter: FilterValuesType
    tasks: Array<TasksType>
    addTask: (taskID: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeTodoListTitle: (newTitle: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
}
    export const TodoList = React.memo((props: TodoListPropsType) => {
        const {
            title,
            filter,
            todoListID,
            changeTodoListFilter
        } = props

        const addTask = useCallback((title: string) => {
            props.addTask(title, todoListID)
        }, [props.addTask, todoListID])

        const removeTodoList = () => {
            props.removeTodoList(todoListID)
        }

        const changeTodoListTitle = useCallback((title: string) => {
            props.changeTodoListTitle(title, todoListID)
        }, [props.changeTodoListTitle, todoListID])

        const setAllFilter = () => changeTodoListFilter("all", todoListID)
        const setActiveFilter = () => changeTodoListFilter("active", todoListID)
        const setCompletedFilter = () => changeTodoListFilter("completed", todoListID)

        let allTodolistTasks = props.tasks;
        let tasksForTodolist = allTodolistTasks;

        if (filter === "active") {
            tasksForTodolist = allTodolistTasks.filter(t => !t.isDone);
        }
        if (filter === "completed") {
            tasksForTodolist = allTodolistTasks.filter(t => t.isDone);
        }
        const removeTask = useCallback((taskID: string) => {
            props.removeTask(taskID, todoListID)
        }, [props.removeTask, todoListID])

        const changeTaskStatus = useCallback((taskID: string, newIsDoneValue: boolean) => {
            props.changeTaskStatus(taskID, newIsDoneValue, todoListID)
        }, [props.changeTaskStatus, todoListID])

        const changeTaskTitle = useCallback((taskID: string, newTitle: string) => {
            props.changeTaskTitle(taskID, newTitle, todoListID)
        }, [props.changeTaskTitle, todoListID])

        const tasks = tasksForTodolist.map(task => {

                return <Task
                    key={task.id}
                    task={task}
                    removeTask={removeTask}
                    changeTaskStatus={changeTaskStatus}
                    changeTaskTitle={changeTaskTitle}
                />
            }
        )


        return (
            <div>
                <h3>

                    <EditableSpan title={title} changeTitle={changeTodoListTitle}/>
                    {/*<button onClick={removeTodoList}>x</button>*/}
                    <IconButton onClick={removeTodoList}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTask}/>
                <ul style={{listStyle: "none", paddingLeft: "0"}}>
                    {tasks}
                </ul>
                <div>
                    <Button
                        variant={"contained"}
                        color={filter === "all" ? "secondary" : "primary"}
                        size={"small"}
                        //className={props.filter === 'all' ? 'active' : ''}
                        onClick={setAllFilter}>All
                    </Button>
                    <Button
                        variant={"contained"}
                        color={filter === "active" ? "secondary" : "primary"}
                        size={"small"}
                        //className={props.filter === 'active' ? 'active' : ''}
                        onClick={setActiveFilter}>Active
                    </Button>
                    <Button
                        variant={"contained"}
                        color={filter === "completed" ? "secondary" : "primary"}
                        size={"small"}
                        //className={props.filter === 'completed' ? 'active' : ''}
                        onClick={setCompletedFilter}>Completed
                    </Button>
                </div>
            </div>
        )
    })
