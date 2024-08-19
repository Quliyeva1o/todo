import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../types";
import requestsController from "../../server/requests";
import { endpoints } from "../../server/endpoints";

interface TodoState {
    todos: Todo[];
    loading: boolean;
    error: string | null;
}

const initialState: TodoState = {
    todos: [],
    loading: false,
    error: null,
};

// Asynchronous actions
export const fetchTodos = createAsyncThunk(
    "todos/fetchTodos",
    async () => {
        const response = await requestsController.getAll(endpoints.todos);
        return response;
    }
);

export const addTodo = createAsyncThunk(
    "todos/addTodo",
    async (newTodo: Todo) => {
        const response = await requestsController.post(endpoints.todos, newTodo);
        return response;
    }
);

export const deleteTodo = createAsyncThunk(
    "todos/deleteTodo",
    async (id:number ) => {
        const response = await requestsController.deleteOne(endpoints.todos, id);
        return response;
    }
);

export const updateTodo = createAsyncThunk(
    "todos/updateTodo",
    async ({ id, updatedTodo }: { id: number, updatedTodo: Todo }) => {
        const response = await requestsController.put(endpoints.todos, id, updatedTodo);
        return response;
    }
);

// Slice
const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        setTodos: (state, action: PayloadAction<Todo[]>) => {
            state.todos = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch todos
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
                state.loading = false;
                state.todos = action.payload;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch todos";
            })
            // Add todo
            .addCase(addTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
                state.loading = false;
                state.todos.push(action.payload);
            })
            .addCase(addTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to add todo";
            })
            // Delete todo
            .addCase(deleteTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to delete todo";
            })
            // Update todo
            .addCase(updateTodo.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
                state.loading = false;
                const index = state.todos.findIndex(todo => todo.id === action.payload.id);
                if (index !== -1) {
                    state.todos[index] = action.payload;
                }
            })
            .addCase(updateTodo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to update todo";
            });
    },
});

export const { setTodos, setLoading, setError } = todoSlice.actions;
export default todoSlice.reducer;
