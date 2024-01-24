import osc from 'osc'

function pulse() {
    try {
        oscPort.send({
            address: '/xremote',
            args: [],
        })
    } catch (e) {
        // Ignore
    }
}

var oscPort = new osc.UDPPort({
    localAddress: '0.0.0.0',
    localPort: 0,
    broadcast: true,
    metadata: true,
    remoteAddress: "192.168.113.4",
    remotePort: 10023,
})

oscPort.on('error', (err) => {
    console.log('error', `Error: ${err.message}`)
})

oscPort.on('ready', () => {
    pulse()
    const heartbeat = setInterval(() => {
        pulse()
    }, 1500)
    const doSync = () => {
        if (oscPort) {
            try {
                oscPort.send({ address: '/xinfo', args: [] })
                oscPort.send({ address: '/-snap/name', args: [] })
                oscPort.send({ address: '/-snap/index', args: [] })
            } catch (e) {
                // Ignore
            }
        }
    }

    doSync()
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
oscPort.on('close', () => {
    console.log('closed')
})

oscPort.on('message', (message) => {
    console.log('Message', message)
})

oscPort.open();

// // For most Ports, send() should only be called after the "ready" event fires.
// oscPort.on("ready", function () {
//     oscPort.send({
//         address: "/carrier/frequency",
//         args: [
//             {
//                 type: "f",
//                 value: 440
//             }
//         ]
//     });
// });