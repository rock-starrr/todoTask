import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialData = [
    {
        id: 1,
        title: "Learn Express.js",
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        status: 'Todo',
    },
    {
        id: 2,
        title: "Clean out car",
        description: 'Fringilla urna porttitor rhoncus dolor purus non. Aliquam eleifend mi in nulla. Purus sit amet luctus venenatis lectus magna fringilla urna porttitor.',
        status: 'Starting soon',
    },
    {
        id: 3,
        title: "Watch a classic movie",
        description: 'Nunc scelerisque viverra mauris in aliquam. Diam in arcu cursus euismod quis viverra. Eget dolor morbi non arcu.',
        status: 'In progress',
    },
    {
        id: 4,
        title: "Organize pantry",
        description: 'Nunc mi ipsum faucibus vitae aliquet nec. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. Sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus.',
        status: 'In QA',
    },
    {
        id: 5,
        title: "Solve a Rubik's cube",
        description: ' Vestibulum lectus mauris ultrices eros in cursus. Sapien et ligula ullamcorper malesuada proin libero nunc. At risus viverra adipiscing at in tellus integer feugiat scelerisque.',
        status: 'Completed',
    }
]

const setTodoLS = (data) => localStorage.setItem('TodoList', JSON.stringify(data))

const initialState = {
    todos: [],
}

const Todo = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        stInitialData: (state, action) => {
            state.todos = action.payload
        },
        addTodo: (state, action) => {
            const data = action.payload
            const todo = {
                id: state.todos.length + 2,
                title: data.title,
                description: data.description,
                status: data.status
            }
            state.todos.push(todo)
            setTodoLS(state.todos)
        },
        deleteTodo: (state, action) => {
            const removedData = state.todos.filter((todo) => todo.id !== action.payload)
            state.todos = removedData
            setTodoLS(removedData)
        },
        editTodo: (state, action) => {
            const { id } = action.payload
            const updatedData = state.todos.map((todo) =>
                todo.id === id ? { ...todo, ...action.payload } : todo
            )
            state.todos = updatedData
            setTodoLS(updatedData)
        },
        setCompletedTodo: (state, action) => {
            const { id } = action.payload
            const updateStatus = state.todos.map((todo) =>
                todo.id === id ? { ...todo, status: 'Completed' } : todo
            )
            state.todos = updateStatus
            setTodoLS(updateStatus)
        }
    }
})

export const {
    addTodo,
    deleteTodo,
    editTodo,
    editTodo1,
    stInitialData,
    setCompletedTodo,
} = Todo.actions
export default Todo.reducer

export const getData = () => async (dispatch) => {
    const list = localStorage.getItem('TodoList')
    console.log(`Geting Todo`);
    const data = JSON.parse(list)
    if (list && data.length !== 0) {
        dispatch(stInitialData(data))
    } else {
        localStorage.setItem('TodoList', JSON.stringify(initialData))
        dispatch(stInitialData(initialData))
    }
}