import { configureStore } from '@reduxjs/toolkit'
import Todo from './Slices/TodoSlice'

export const store = configureStore({
    reducer: {
        todo: Todo,
    }
})
