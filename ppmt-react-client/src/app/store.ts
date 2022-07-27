import {configureStore} from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counter-slice"
import {projectApiSlice} from "../features/project/projectapi-slice"
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        [projectApiSlice.reducerPath]: projectApiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(projectApiSlice.middleware)
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
