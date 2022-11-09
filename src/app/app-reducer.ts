import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {authAPI} from "../api/todolist-api";
import {Dispatch} from "redux";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

const initialState = {
    // происходит ли сейчас взаимодействие с сервером
    status: "idle" as RequestStatusType,
    // если какая то глобальная ошибка произойдет, - мы запишем текст ошибки сюда
    error: null as string | null,
    isInitialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

// Action Creators
export const setAppStatus = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
export const setAppError = (error: string | null) => ({type: "APP/SET-ERROR", error} as const)
export const setAppIsInitialized = (isInitialized: boolean) => ({type: "APP/SET-IS-INITIALIZED", isInitialized} as const)

// Types
export type SetAppStatusType = ReturnType<typeof setAppStatus>
export type SetAppErrorType = ReturnType<typeof setAppError>
export type SetIsInitializedType = ReturnType<typeof setAppIsInitialized>

export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus("loading"))
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
                dispatch(setAppStatus("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
        .finally(() => {
            dispatch(setAppIsInitialized(true))
        })
}


type ActionsType =
    | SetAppStatusType
    | SetAppErrorType
    | SetIsInitializedType