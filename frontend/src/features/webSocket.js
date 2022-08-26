// {
//     connected: false,
//         component: null
// }

// const timeout = 250; // Initial timeout duration as a class variable

// /**
//  * utilited by the @function connect to check if the connection is close, if so attempts to reconnect
//  */
// function check() {
//     const { ws } = this.state;
//     if (!ws || ws.readyState === WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
// };

// /**
//    * @function connect
//    * This function establishes the connect with the websocket and also ensures constant reconnection if connection closes
//    */
// function connect() {
//     var ws = new WebSocket("ws://localhost:8080");
//     let that = this; // cache the this
//     var connectInterval;

//     // websocket onopen event listener
//     ws.onopen = () => {
//         console.log("connected websocket main component");

//         this.setState({ ws: ws, connected: true });

//         that.timeout = 250; // reset timer to 250 on open of websocket connection 
//         clearTimeout(connectInterval); // clear Interval on on open of websocket connection
//     };

//     ws.onmessage = evt => {
//         // listen to data sent from the websocket server
//         const { slot, key, value } = JSON.parse(evt.data)
//         console.log(JSON.stringify({ slot, key, value }));
//         this.setState({ [key]: value })
//         // window[`Slot${slot}`].setState({ [key]: value })
//     }

//     // websocket onclose event listener
//     ws.onclose = e => {
//         console.log(
//             `Socket is closed. Reconnect will be attempted in ${Math.min(
//                 10000 / 1000,
//                 (that.timeout + that.timeout) / 1000
//             )} second.`,
//             e.reason
//         );
//         this.setState({ connected: false })
//         that.timeout = that.timeout + that.timeout; //increment retry interval
//         connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
//     };

//     // websocket onerror event listener
//     ws.onerror = err => {
//         console.error(
//             "Socket encountered error: ",
//             err.message,
//             "Closing socket"
//         );

//         ws.close();
//     };
// };