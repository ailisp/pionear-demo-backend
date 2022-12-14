const WebSocket = require('ws')

let validators = []

let webSocket = new WebSocket('wss://backend-mainnet-1713.onrender.com/ws');
webSocket.onerror = (event) => {
    console.error(event)
}
webSocket.onopen = (event) => {
    webSocket.send(JSON.stringify([{"id":11,"jsonrpc":"2.0","method":"subscription","params":{"path":"validators"}}]))
}
webSocket.onmessage = (event) => {
    try {
        let eventData = JSON.parse(event.data)
        if (eventData.result.type === 'data') {
            validators = eventData.result.data
            console.log('received ' + validators.length + ' validators')
        }
    } catch (e) {
        console.error(e)
    }
}

const express = require('express')
const cors = require('cors')

const app = express()
const port = 4000
app.use(cors())

app.get('/', (req, res) => {
    res.json(validators)
})

app.listen(port, () => {
  console.log(`pionear-demo-backend listening on port ${port}`)
})