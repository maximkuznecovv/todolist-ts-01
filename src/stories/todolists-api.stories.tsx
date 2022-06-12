import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '75c2dc54-1515-4be3-abc1-f18008041a1d'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistAPI.getTodos()
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'React'
        todolistAPI.createTodo(title)
            .then( (res) => {
            setState(res.data);
        } )

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'b1ab2070-9415-4bca-9519-1434339af9d0';
        todolistAPI.deleteTodo(todolistId)
            .then( (res) => {
            setState(res.data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'b5e674a2-0e2c-459c-bef9-6e49a27e02eb'
        const title = 'MIN'
        todolistAPI.updateTodoTitle(todolistId, title)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTodoListTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = '95219a02-1a96-4032-b936-bfd6b7cebb1b'
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodoListTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = '95219a02-1a96-4032-b936-bfd6b7cebb1b'
        const title = 'YoYo woman'
        todolistAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodoListTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = '95219a02-1a96-4032-b936-bfd6b7cebb1b'
        const taskId = '060060bb-0c70-4e78-bafe-6efa3f6275a2'
        const title = 'Updated Task 2'
        todolistAPI.updateTask(todolistId, taskId, {
            title: title,
            description: 'string',
            status: 2,
            priority: 3,
            startDate: '',
            deadline: '',
        })
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodoListTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = '6a85142d-d303-4272-8f59-e1cb59e1d14d'
        const taskId = 'a9b0510e-c4f8-4c2a-9cf9-c996adbcce20'
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}