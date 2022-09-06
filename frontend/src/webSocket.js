import { errorPage, insertBattery, pullBattery, swapCompleted, waitForSwap } from './features/goToPage';
export class WS {
    constructor() {
        this.timeout = 250; // Initial timeout duration as a class variable
        this.connected = false;
        this.ws = null
        setTimeout(() => this.check())
    }



    /**
     * utilited by the @function connect to check if the connection is close, if so attempts to reconnect
     */
    check() {
        const { ws } = this;
        if (!ws || ws.readyState === WS.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
    };

    /**
       * @function connect
       * This function establishes the connect with the websocket and also ensures constant reconnection if connection closes
       */
    connect() {
        var ws = new WebSocket("ws://localhost:8080");
        let that = this; // cache the this
        var connectInterval;
        ws.onopen = () => {
            console.log("connected websocket main component");
            this.ws = ws;
            this.connected = true
            that.timeout = 250; // reset timer to 250 on open of websocket connection 
            clearTimeout(connectInterval); // clear Interval on on open of websocket connection
        };

        ws.onmessage = evt => {
            // listen to data sent from the websocket server
            const { slot, key, value } = JSON.parse(evt.data)
            console.log(JSON.stringify({ slot, key, value }));
            debugger;
            switch (key) {
                case 'insert-battery':
                    insertBattery(value);
                    break;
                case 'pull-battery':
                    pullBattery(value);
                    break;
                case 'error-page':
                    errorPage(value);
                    break
                case 'wait-for-swap':
                    waitForSwap();
                    break
                case 'swap-completed':
                    swapCompleted(value);
                    break
                default:
                    errorPage('Unknown error');
            }
            // window[`Slot${slot}`].setState({ [key]: value })
        }

        // websocket onclose event listener
        ws.onclose = e => {
            console.log(
                `Socket is closed. Reconnect will be attempted in ${Math.min(
                    10000 / 1000,
                    (that.timeout + that.timeout) / 1000
                )} second.`,
                e.reason
            );
            this.connected = false;
            that.timeout = that.timeout + that.timeout; //increment retry interval
            connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
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
    };
}