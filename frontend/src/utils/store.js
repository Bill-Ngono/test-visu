import { configureStore } from '@reduxjs/toolkit'
import { stepReducer } from '../features/stepReducer'


export default configureStore({
    reducer: {
        steps: stepReducer.reducer
    }
})
// The default Middleware Thunk are going to intercep our action function "readWebSocket"
// and exec it with dispatch and getState -> retrun readWebSocket(store.dispatch, store.getState)