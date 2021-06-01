var WebSocketServer = require('websocket').server
var http = require('http')
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads')
module.exports =  function createWebSocket() {
    return function () {
        const data = workerData
        // console.log(data);
        // console.log(workerData);
        parentPort.postMessage('websocket子线程')
        var server = http.createServer(function (request, response) {
            console.log((new Date()) + ' Received request for ' + request.url);
            response.writeHead(404);
            response.end();
        })
        server.listen(3001, function () {
            console.log((new Date()) + ' Server is listening on port 3001');
        })
        
        var webServer = new WebSocketServer({
            httpServer: server,
            autoAcceptConnections: false
        })
        
        function originIsAllowed(origin) {
            return true
        }
        
        webServer.on('request', function (request) {
            if (!originIsAllowed(request.origin)) {
                // Make sure we only accept requests from an allowed origin
                request.reject();
                console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
                return;
            }
        
            var connection = request.accept('echo-protocol', request.origin);
            // console.log((new Date()) + ' Connection accepted.');
    
            connection.on('close', function (reasonCode, description) {
                console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
            });
        });
    }
   
}
 
 if(!isMainThread){
    debugger
    connection.on('message',  ()=> {
        if (message.type === 'utf8') {
            connection.sendUTF(data);
        }
        else if (message.type === 'binary') {
            connection.sendBytes(data);
        }
        // debugger
        // console.log();
        // connection.sendUTF(data);
        
    });
}
