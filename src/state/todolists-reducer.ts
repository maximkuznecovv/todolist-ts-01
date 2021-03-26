import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}

type AddTodoListActionType = {
    type: "ADD-TODOLIST"
    title: string
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

export const todoListsReducer = (todoLists: TodoListType[], action: ActionType): TodoListType[] => { // TodoListType[] или Array<TodoListType>
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodoListID = v1()
            const newTodoList: TodoListType = {id: newTodoListID, title: action.title, filter: "all"}
            return [...todoLists, newTodoList]
        case "CHANGE-TODOLIST-TITLE":
            /*const todoList = todoLists.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
                return [...todoLists]
            }
            return todoLists*/
            return todoLists.map(tl => {
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
            return todoLists.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, filter: action.filter}
                } else {
                    return tl
                }
            })
        }
        default:
            return todoLists
    }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListActionType => {
    return {type: "REMOVE-TODOLIST", id} // id или id: id
}

export const AddTodoListAC = (title: string): AddTodoListActionType => {
    return {type: "ADD-TODOLIST", title} // title или  title: title
}

export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id, title} // title или  title: title
}

export const ChangeTodoListFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id, filter} // filter или filter: filter
}
