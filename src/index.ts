const express = require('express')
const http = require('http')
const ws = require('ws')
const {existsSync} = require('fs')
const basicAuth = require('basic-auth')
const path = require('path')
const dotenv = require('dotenv')
const zeromq = require('zeromq')

if (
    process.env.NODE_ENV === 'development' &&
    existsSync(path.resolve(process.cwd(), '.env'))
) {
    dotenv.config({ path: path.resolve(process.cwd(), '.env') });
} else {
    dotenv.config({ path: path.resolve(process.cwd(), '.env.production') });
}

const express_port = 8080;
const zeromq_port = 5559;
const app = express();

// Configuration
// app.use((req, res, next) => {
//     // Require authentication when the connection is not from localhost.
//     if (req.headers.host == `localhost:${express_port}`) {
//         return next();
//     }

//     const authentication = basicAuth(req);

//     if (
//         authentication &&
//         authentication.name == process.env.DASHBOARD_USER &&
//         authentication.pass == process.env.DASHBOARD_PWD
//     ) {
//         return next();
//     }

//     res.set('WWW-Authenticate', 'Basic');

//     return res.status(401).send();
// });

app.use(express.static(path.resolve(process.cwd(), 'frontend', 'build')));

const server = http.createServer(app);

server.listen(express_port, () => {
    console.log(`Express server is running port ${express_port}`);
});

const wsServer = new ws.Server({ server });
wsServer.on('connection', async (socket) => {
    console.log('WS client connected');

    // socket.on('message', (message) => {
    //     const { slot, command, value } = JSON.parse(message);
    //     switch (command) {
    //         default:
    //             break;
    //     }
    //     console.log(JSON.parse(message));
    // });
    await delay(2000);
    // send_ws(0, "step", "wait-for-swap");
    send_ws(0, "wait-for-swap", "");
});

app.get('/', (req, res) => {
    res.send('BSS Control Simulator')
})


app.get('/send/:step', (req, res) => {
    const step = req.params.step
    switch (step) {
        case "1":
            send_ws(0, "wait-for-swap", "")
            break;
        case "2":
            send_ws(0, "station-reboot", "")
            break;
        case "3":
            send_ws(0, "insert-battery", false)
            break;
        case "4":
            send_ws(0, "insert-battery", true)
            break;
        case "5":
            send_ws(0, "pull-battery", false)
            break;
        case "6":
            send_ws(95, "pull-battery", true)
            break;
        case "7":
            send_ws(65, "pull-battery", true)
            break;
        case "8":
            send_ws(0, "charging-station", "")
            break;
        case "9":
            send_ws(0, "error-page", "Aie, nous n'arrivons pas à lire correctement votre batterie")
            break;
    
        default:
            break;
    }
    res.send(`Sended: ${step}`)
    
})


function send_ws(slot, key, value) {
    wsServer.clients.forEach((client) => {
        client.send(JSON.stringify({ slot, key, value }));
    });
}

async function parse_zmq() {
    const socket = new zeromq.Reply();
    await socket.bind(`tcp://127.0.0.1:${zeromq_port}`);
    console.log(`ZeroMQ server is running port ${zeromq_port}`);
    console.log();
    try {
        for await (const [msg] of socket) {

            /* const recipient: any = {
                bss_control: 1,
                bss_auth: 3,
                bss_comm: 4,
                bss_slot: 5
            }; */

            const ack = msg;
            const from = msg[0];
            const to = msg[4];
            const type = msg[8];
            const value_1 = msg[24];
            const status = msg[16];
            const state = Buffer.from([...msg.slice(16, 20)]);
            const body = Buffer.from([...msg.slice(25, 33)]);
            ack[0] = to;
            ack[4] = from;
            ack[12] = 0x01;
            await socket.send(ack);
            try {
                if (from === 1) {
                    switch (type) {
                        /*
                        from 1 status 10 type 17 value_1 156 => restart bss_control
                        from 1 status 10 type 17 value_1 8 => bss_control ready ?
                        from 1 status 6 type 17 value_1 214 => étape après
                        */

                        default:
                            break;
                    }
                }
            } catch (e) {
                console.error(e);
            }

        }
    } catch (e) {
        console.error(e);
    }
}

parse_zmq();

function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(1), ms)
    })
}