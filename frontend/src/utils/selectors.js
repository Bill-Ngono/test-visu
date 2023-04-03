export const selectStep = () => {
    return (state) => state.steps.step
} 
export const selectErrorMessage = () => { 
    return (state) => state.steps.error_message 
}
export const selectBatteryInserted = () => { 
    return (state) => state.steps.battery_inserted
}
export const selectBatteryCollected = () => {
    return (state) => state.steps.battery_collected
}
export const selectSoc= () => {
    return (state) => state.steps.soc
}