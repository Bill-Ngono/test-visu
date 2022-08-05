"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = __importDefault(require("ws"));
const fs_1 = require("fs");
const basic_auth_1 = __importDefault(require("basic-auth"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const zeromq = __importStar(require("zeromq"));
if (process.env.NODE_ENV === 'development' &&
    (0, fs_1.existsSync)(path_1.default.resolve(process.cwd(), '.env'))) {
    dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), '.env') });
}
else {
    dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), '.env.production') });
}
const express_port = 8080;
const zeromq_port = 5559;
const app = (0, express_1.default)();
app.use((req, res, next) => {
    if (req.headers.host == `localhost:${express_port}`) {
        return next();
    }
    const authentication = (0, basic_auth_1.default)(req);
    if (authentication &&
        authentication.name == process.env.DASHBOARD_USER &&
        authentication.pass == process.env.DASHBOARD_PWD) {
        return next();
    }
    res.set('WWW-Authenticate', 'Basic');
    return res.status(401).send();
});
app.use(express_1.default.static(path_1.default.resolve(process.cwd(), '..', 'frontend', 'build')));
const server = app.listen(express_port, () => {
    console.log(`Express server is running port ${express_port}`);
});
const wsServer = new ws_1.default.Server({ server });
wsServer.on('connection', (socket) => {
    console.log('WS client connected');
    send_ws(0, "step", "wait-for-swap");
});
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
            }
            catch (e) {
                console.error(e);
            }
        }
    }
    catch (e) {
        console.error(e);
    }
}
parse_zmq();
//# sourceMappingURL=index.js.map