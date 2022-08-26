import { createSlice } from '@reduxjs/toolkit'

export const goToStep = createSlice({
    name: 'steps',
    initialState: {
        step: 'wait-for-swap',
        battery_inserted: false,
        battery_collected: false,
    },
    reducers: {
        waitForSwap: (state) => {
            state.step = 'wait-for-swap'
            state.battery_inserted = false
            state.battery_collected = false
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
    },
})

// Action creators are generated for each case reducer function
export const { waitForSwap, insertBattery, pullBattery, swapCompleted } = goToStep.actions

export const selectStep = (state) => state.steps.step
export const selectBatteryInserted = (state) => state.steps.battery_inserted
export const selectBatteryCollected = (state) => state.steps.battery_collected

export default goToStep.reducer