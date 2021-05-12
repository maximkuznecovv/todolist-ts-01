import {todolistAPI, TodoListType} from '../api/todolist-api';
import {Dispatch} from 'redux';

export type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}

export type AddTodoListActionType = {
    type: "ADD-TODOLIST"
    todoList: TodoListType
}

type ChangeTodoListTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}

type ChangeTodoListFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}

export type ActionType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType
    | SetTodoListType


const initialState: TodoListDomainType[] = []

export type FilterValuesType = "all" | "active" | "completed"

export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
}

export const todoListsReducer = (state: TodoListDomainType[] = initialState, action: ActionType): TodoListDomainType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            return action.todoLists.map((tl) => ({
                ...tl,
                filter: 'all'
            }))
        }
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodoList: TodoListDomainType = {
                ...action.todoList,
                filter: 'all',
            }
            return [...state, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            /*const todoList = todoLists.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
                return [...todoLists]
            }
            return todoLists*/
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, title: action.title}
                } else {
                    return tl
                }
            })
        case "CHANGE-TODOLIST-FILTER": {
            /*const todoList = todoLists.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
                return [...todoLists]
            }
            return todoLists*/
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, filter: action.filter}
                } else {
                    return tl
                }
            })
        }
        default:
            return state
    }
}

export const setTodoListAC = (todoLists: Array<TodoListType>) => ({type: 'SET-TODOLISTS', todoLists} as const)
export type SetTodoListType = ReturnType<typeof setTodoListAC>

export const removeTodoListAC = (id: string): RemoveTodoListActionType => {
    return {type: "REMOVE-TODOLIST", id} // id или id: id
}

export const addTodolistAC = (todoList: TodoListType): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', todoList}
}

export const changeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id, title} // title или  title: title
}

export const changeTodoListFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id, filter} // filter или filter: filter
}

// Thunk Creators

export const fetchTodoLists = () => (dispatch: Dispatch) => {
    todolistAPI.getTodos()
        .then((res) => {
            const todoLists = res.data
            dispatch(setTodoListAC(todoLists))
        })
}
export const createTodoList = (title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTodo(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
            }
        })
}
export const deleteTodoList = (todoListId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodo(todoListId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodoListAC(todoListId))
            }
        })
}
export const updateTodoListTitle = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    todolistAPI.updateTodoTitle(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodoListTitleAC(todolistId, title))
            }
        })
}