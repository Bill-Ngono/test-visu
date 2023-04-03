import { createSlice } from '@reduxjs/toolkit'

export function readWebSocket(dispatch, getState) {
    // we return a thunk
    return async (dispatch, getState) => {
        try {

            var ws = new WebSocket("ws://localhost:8080");
            ws.onopen = () => {
                console.log("connected websocket main component");
            };

            ws.onmessage = evt => {
                
                // listen to data sent from the websocket server
                const { slot, key, value } = JSON.parse(evt.data)
                console.log(JSON.stringify({ slot, key, value }));

                
                // debugger;
                switch (key) {
                    case 'insert-battery':
                        dispatch(insertBattery(value));
                        break;
                    case 'pull-battery':
                        dispatch(deliveredSoc(slot))
                        dispatch(pullBattery(value));
                        break;
                    case 'error-page':
                        dispatch(errorPage(value));
                        break
                    case 'wait-for-swap':
                        dispatch(waitForSwap());
                        break
                    case 'swap-completed':
                        dispatch(swapCompleted());
                        break
                    case 'charging-station':
                        dispatch(chargingStation());
                        break
                    case 'station-reboot':
                        dispatch(stationReboot());
                        break
                    default:
                        dispatch(errorPage('Unknown error'));
                }
            
                // window[`Slot${slot}`].setState({ [key]: value })
            }

            // websocket onclose event listener 
            ws.onclose = e => {
                console.log(
                    `Socket is closed`,
                    e.reason
                )
            };

            // websocket onerror event listener
            ws.onerror = err => {
                console.error(
                    "Socket encountered error: ",
                    err.message,
                    "Closing socket"
                );

                ws.close();
            };
                
        } catch (error) {
            console.error(error);
        }
    }
}

export const stepReducer = createSlice({
    name: 'steps',
    initialState: {
        step: 'wait-for-swap',
        battery_inserted: false,
        battery_collected: false,
        error_message: '',
        soc: 0
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
        deliveredSoc: (state, action) => {
            state.soc = action.payload
        },
        swapCompleted : (state, action) => {
            state.step = 'swap-completed'
        },
        chargingStation : (state, action) => {
            state.step = 'charging-station'
        },
        stationReboot : (state, action) => {
            state.step = 'station-reboot'
        },
        errorPage: (state, action) => {
            state.step = 'error-page'
            state.error_message = action.payload
        }

    },
})

// Action creators are generated for each case reducer function
export const { waitForSwap, insertBattery, pullBattery, deliveredSoc, swapCompleted, chargingStation, stationReboot, errorPage } = stepReducer.actions
