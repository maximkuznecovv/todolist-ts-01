import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type  AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('AddItemForm render')
    const [title, setTitle] = useState<string>("")
    //const [error, setError] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)


    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        //setError(false)
        if (error !== null) setError(null)
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addItem()
        }
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            // alert('Error!')
            //setError(true)
            setError('Title is required!')
        }
        setTitle("")
    }

    return (
        <div>
            <TextField
                variant={"outlined"}
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressAddItem}
                label={'Title'}
                error={!!error}
                helperText={error && 'Title is required!'}
                disabled={props.disabled}
            />
            <IconButton onClick={addItem} disabled={props.disabled}>
                <AddBox/>
            </IconButton>
            {/*{error && <div className='error-message'>Title is required!</div>}*/}
            {/*{error && <div className={"error-message"}>Title is required!</div>}*/}
        </div>
    )
})
