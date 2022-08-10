import express from 'express';
import ws from 'ws';
import { existsSync } from 'fs';
import basicAuth from 'basic-auth';
import path from 'path';
import dotenv from 'dotenv'
import * as zeromq from 'zeromq';

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
app.use((req, res, next) => {
    // Require authentication when the connection is not from localhost.
    if (req.headers.host == `localhost:${express_port}`) {
        return next();
    }

    const authentication = basicAuth(req);

    if (
        authentication &&
        authentication.name == process.env.DASHBOARD_USER &&
        authentication.pass == process.env.DASHBOARD_PWD
    ) {
        return next();
    }

    res.set('WWW-Authenticate', 'Basic');

    return res.status(401).send();
});

app.use(express.static(path.resolve(process.cwd(), '..', 'frontend', 'build')));

const server = app.listen(express_port, () => {
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
    send_ws(0, "step", "wait-for-swap");
});


function send_ws(slot: number, key: string, value:any) {
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
                switch (type) {
                    default:
                        debugger;
                        break;
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