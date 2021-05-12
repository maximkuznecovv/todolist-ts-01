import React, {useCallback, useEffect} from "react";
import "./App.css";
import {TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    fetchTodoLists,
    FilterValuesType,
    removeTodoListAC,
    TodoListDomainType
} from "./state/todolists-reducer";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType} from './api/todolist-api';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export function App() {
    const todoLists = useSelector<AppRootStateType, TodoListDomainType[]>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodoLists())
    }, [])

    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(removeTaskAC(taskID, todoListID))
    }, [dispatch])
    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
    }, [dispatch])
    const changeTaskStatus = useCallback((taskID: string, status: TaskStatuses, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskID, status, todoListID))
    }, [dispatch])
    const changeTaskTitle = useCallback((taskID: string, newTitle: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskID, newTitle, todoListID))
    }, [dispatch])
    const changeTodoListFilter = useCallback((newFilterValue: FilterValuesType, todoListID: string) => {
        dispatch(changeTodoListFilterAC(todoListID, newFilterValue))
    }, [dispatch])
    const changeTodoListTitle = useCallback((newTitle: string, todoListID: string) => {
        dispatch(changeTodoListTitleAC(todoListID, newTitle))
    }, [dispatch])
    const removeTodoList = useCallback((todoListID: string) => {
        const action = removeTodoListAC(todoListID)
        dispatch(action)
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        const action = addTodoListAC(title)
        dispatch(action)
    }, [dispatch])

    //UI:
    //CRUD (create, read, update, delete)
    const todoListComponents = todoLists.map(tl => {
        /*let tasks = tasks[tl.id]
        if (tl.filter === "active") {
            tasks = tasks.filter(t => t.isDone === false) // чтобы не подсвечивалось, можно писать так -  !t.isDone
        }
        if (tl.filter === "completed") {
            tasks = tasks.filter(t => t.isDone === true) // t.isDone
        }*/
        return (
            <Grid item key={tl.id}>
                <Paper elevation={6} style={{padding: "20px"}}>
                    <TodoList
                        key={tl.id}
                        todoListID={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={tasks[tl.id]}
                        addTask={addTask}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        changeTaskStatus={changeTaskStatus}
                        changeTodoListFilter={changeTodoListFilter}
                        changeTodoListTitle={changeTodoListTitle}
                        changeTaskTitle={changeTaskTitle}
                    />
                </Paper>
            </Grid>
        )
    })
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default App;

