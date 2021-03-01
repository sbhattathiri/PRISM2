const http = require('http')
const fs = require('fs')
const url = require('url')
const WebSocketServer = require('websocket').server;

let server = http.createServer((req, res) => {
    let urlParsed = url.parse(req.url)
    let staticFileToBeServed = urlParsed.path.split('/')[1]
    fs.readFile(staticFileToBeServed, (error, data) => {
        if(error){
            res.statusCode = 404
            res.end(http.STATUS_CODES[404])
        }
        else{
            res.statusCode = 200
            res.end(data)
        }      
    })
}).listen(8000)

console.log('server running on port 8000')

const serverConfig = {
    httpServer: server,
    autoAcceptConnections: false
}

let wsserver = new WebSocketServer()
wsserver.mount(serverConfig)

wsserver.on('connect', (connection) => {
    console.log('connected')
    connection.send('Hi ! using ws')
})

wsserver.on('request', (req)=>{
    console.log(`request from client : ${req}`)
    var conn = req.accept('echo-protocol', req.origin)
    conn.on('message', (mesg) => {
        console.log(`message : ${mesg}`)
        if(mesg.type === 'utf-8'){
            console.log(`message utf data : ${mesg.utf8Data}"`)
        }
        else if(mesg.type === 'binary'){
            console.log(`message binary data : ${mesg.binaryData}"`)
        }
    })

    conn.on('close', (code, description) => {
        console.log(`connection closed with code : ${code} , ${description}`)
    })
})
