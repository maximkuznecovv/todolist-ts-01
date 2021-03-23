import React, {useState} from "react";
import "./App.css";
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type TaskType = {
    title: string
    id: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    //CRUD
    //BLL
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Meat", isDone: false},
        ]
    })


    function removeTask(taskID: string, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const filteredTasks = todoListTasks.filter(t => t.id !== taskID)
        tasks[todoListID] = filteredTasks
        setTasks({...tasks})
    }

    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        const TodoListTasks = tasks[todoListID]
        tasks[todoListID] = [newTask, ...TodoListTasks]
        // tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({...tasks})
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        const TodoListTasks = tasks[todoListID]
        const task = TodoListTasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        const TodoListTasks = tasks[todoListID]
        const task = TodoListTasks.find(t => t.id === taskID)
        if (task) {
            task.title = newTitle
            setTasks({...tasks})
        }
    }

    function changeFilter(newFilterValue: FilterValuesType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = newFilterValue
            setTodoLists([...todoLists])
        }
    }

    function changeTitle(newTitle: string, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    function addTodoList(title: string) {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {id: newTodoListID, title, filter: "all"}
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }

    //UI:
    //CRUD (create, read, update, delete)
    const todoListComponents = todoLists.map(tl => {
        let tasksForTodoList = tasks[tl.id]
        if (tl.filter === "active") {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false) // чтобы не подсвечивалось, можно писать так -  !t.isDone
        }
        if (tl.filter === "completed") {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true) // t.isDone
        }
        return (
            <Grid item key={tl.id}>
                <Paper elevation={6} style={{padding: "20px"}}>
                    <TodoList
                        todoListID={tl.id}
                        filter={tl.filter}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        addTask={addTask}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        changeFilter={changeFilter}
                        changeTitle={changeTitle}
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

