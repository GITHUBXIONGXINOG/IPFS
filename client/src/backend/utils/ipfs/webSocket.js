// var progress = 0

// //创建websocket
// var server = http.createServer(function (request, response) {
//     console.log((new Date()) + ' Received request for ' + request.url);
//     response.writeHead(404);
//     response.end();
// })
// server.listen(3001, function () {
//     console.log((new Date()) + ' Server is listening on port 3001');
// })

// var webServer = new WebSocketServer({
//     httpServer: server,
//     autoAcceptConnections: false
// })

// function originIsAllowed(origin) {
//     return true
// }

// webServer.on('request', function (request) {
//     if (!originIsAllowed(request.origin)) {
//         // Make sure we only accept requests from an allowed origin
//         request.reject();
//         console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
//         return;
//     }

//     var connection = request.accept('echo-protocol', request.origin);
//     // console.log((new Date()) + ' Connection accepted.');
//     connection.on('message', () => {
//         debugger
//         connection.sendUTF(encryptProgress);

//         // });
//         connection.on('close', function (reasonCode, description) {
//             console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
//         });
//     });

// }
var http = require('http')
var WebSocketServer = require('websocket').server
var progress = 0
let temp
let initWebSocket = function () {
    debugger
    //创建websocket
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
        let timer = null
       connection.on('message', () => {
            debugger
            timer = setInterval(()=>{
                connection.sendUTF(progress);
            },1000)

            // });
            connection.on('close', function (reasonCode, description) {
                console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
                clearInterval(timer)
            });
        })
    })
}
let setProgress = function (data) {
    console.log(data);
    progress = data
}
/**
 * 
 * @param {Number} chunk 分片       
 * @param {Number} size 总大小
 * @param {Boolean} endFlag 结束标记
 * @returns 
 */
module.exports = {
    setProgress,
    initWebSocket
}  