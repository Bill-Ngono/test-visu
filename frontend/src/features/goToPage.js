import { createSlice } from '@reduxjs/toolkit'

export const goToStep = createSlice({
    name: 'steps',
    initialState: {
        step: 'wait-for-swap',
        battery_inserted: false,
        battery_collected: false,
        error_message: ''
    },
    reducers: {
        waitForSwap: (state) => {
            state.step = 'wait-for-swap'
            state.battery_inserted = false
            state.battery_collected = false
            state.error_message = ''
        },
        insertBattery : (state, action) => {
            state.step = 'insert-battery'
            state.battery_inserted = action.payload
        },
        pullBattery : (state, action) => {
            state.step = 'pull-battery'
            state.battery_collected = action.payload
        },
        swapCompleted : (state) => {
            state.step = 'swap-completed'
        },
        errorPage: (state, action) => {
            state.step = 'error-page'
            state.error_message = action.payload
        }

    },
})

// Action creators are generated for each case reducer function
export const { waitForSwap, insertBattery, pullBattery, swapCompleted, errorPage } = goToStep.actions

export const selectStep = (state) => state.steps.step
export const selectErrorMessage = (state) => state.steps.error_message
export const selectBatteryInserted = (state) => state.steps.battery_inserted
export const selectBatteryCollected = (state) => state.steps.battery_collected

export default goToStep.reducer