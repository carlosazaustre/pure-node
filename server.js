'use strict'

const http = require('http')

// Event typeson http servers:
// connect — raised for all the ‘connect’ request by the HTTP client.
// connection  —  Emitted when a new TCP stream is established. Provide access to the socket established.
// request —  Emitted for Each request from the client (We would listen here).
// upgrade —  emitted each time a client requests an upgrade of the protocol (can be HTTP version).
const server = http.createServer()

// The request event provides the listener function with 2 parameters which are:
// @request  —  an instance of http.incomingMessage object
// @response  —  an instance of http.ServerResponse object.
server.on('request', (request, response) => {
    let body = []
    
    request.on('data', chunk => {
        body.push(chunk)
    })

    request
        .on('end', () => {
            let bodyString = body.concat().toString()
            response.end(bodyString)
        })
        .on('error', () => {
            // your logic to handle errors goes here
            response.statusCode = 400
            response.end()
        })

    response.on('error', err => {
        console.err(err)
    })

    // tell the client that response was successful.
    response.statusCode = 200;
    response.write('Hello, World!')
    // .end() method allows us to close the HTTP connection that was set up 
    // at the time of the request hitting our server. The end() method also 
    // accepts a last string to be written before closing the connection.
    response.end()
})


server.listen(8080, () => {
    console.log('Server listening at 8080')
})