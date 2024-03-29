import axios, {AxiosResponse} from "axios"

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "75c2dc54-1515-4be3-abc1-f18008041a1d"
    }
})

// API
export const todolistAPI = {
    getTodos() {
        return instance.get<Array<TodoListType>>("todo-lists")
    },
    createTodo(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>("todo-lists", {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },


    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, {
            title
        })
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<TaskType>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    deleteTask(todolistId: string, taskId: string,) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
}

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType<{ userId: number }>>>("auth/login", data)
    },
    me() {
        return instance.get<ResponseType<MeResponseType>>("auth/me")
    },
    logout() {
        return instance.delete<ResponseType>('auth/login')
    }
}


// Types
export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}

type MeResponseType = {
    id: number
    email: string
    login: string
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

export type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}
type GetTasksResponse = {
    totalCount: number
    error: string | null
    items: Array<TaskType>
}
export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type TaskType = {
    id: string
    title: string
    description: string,
    todoListId: string
    order: number
    status: TaskStatuses
    priority: TodoTaskPriorities
    startDate: string
    deadline: string
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TodoTaskPriorities
    startDate: string
    deadline: string
}