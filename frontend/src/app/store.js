import { configureStore } from '@reduxjs/toolkit'
import stepReducer from '../features/goToPage'

export default configureStore({
    reducer: {
        steps: stepReducer
    }
})