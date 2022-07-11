import React from "react";
import "./App.css";
import {
    AppBar,
    Button,
    Container,
    createStyles,
    IconButton, LinearProgress,
    makeStyles,
    Theme,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TodoListsList} from "../features/TodoListsList/TodoListsList";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {Routes, Route, Navigate} from "react-router-dom";

export function App() {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    return (
        <div className="App">
            <ErrorSnackbar/>
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
            {status === "loading" && <LinearProgress color="secondary"/>}
            <Container fixed>
                <Routes>
                    <Route path="/" element={<TodoListsList/>}/>
                    <Route path="login" element={<Login/>}/>

                    {/*<Route path="*" element={<h1 style={{textAlign: "center"}}>404: PAGE NOT FOUND</h1>}/>*/}
                    <Route path="/404" element={<h1 style={{textAlign: "center"}}>404: PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to='/404'/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;