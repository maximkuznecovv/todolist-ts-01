import React, {useEffect} from "react";
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
    Typography,
    CircularProgress
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {TodoListsList} from "../features/TodoListsList/TodoListsList";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {Routes, Route, Navigate} from "react-router-dom";
import {logoutTC} from "../features/Login/auth-reducer";

export function App() {

    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: "fixed", top: "30%", textAlign: "center", width: "100%"}}>
            <CircularProgress/>
        </div>
    }


    const logoutHandler = () => {
        dispatch(logoutTC())
    };

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

                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Logout</Button>}

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