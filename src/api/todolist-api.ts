import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '75c2dc54-1515-4be3-abc1-f18008041a1d'
    }
})

export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TodoTaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later,
}


// Tasks
export type TaskType = {
    id: string
    title: string
    description: null | string,
    todoListId: string
    order: number
    status: TaskStatuses
    priority: TodoTaskPriorities
    startDate: string | null
    deadline: string | null
    addedDate: string
}

type ResponseTaskType = {
    totalCount: number
    error: string | null
    items: Array<TaskType>
}



export const todolistAPI = {
    getTodos() {
        return instance.get<Array<TodoListType>>('todo-lists')
    },
    createTodo(title: string) {
        return instance.post<ResponseType<{ item: TodoListType  }>>('todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },


    getTasks(todolistId: string) {
        return instance.get<ResponseTaskType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, {
            title
        })
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {
            title: title,
            description: 'required(string)',
            completed: false,
            status: 0,
            priority: 1,
            startDate: null,
            deadline: null,
        })
    },
    deleteTask(todolistId: string, taskId: string,) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
}
