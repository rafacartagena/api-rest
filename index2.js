var http= require('http');
var server = http.createServer();

//http.createServer().listen(8080);

function HTTP_Response(request, response){
    response.writeHead(200,{'Content-Type': 'text/plain'});
    response.end('Hola a todas y a todos 2!\n');
}

server.on('request', HTTP_Response);
server.listen(8080);

console.log('Servidor ejecutándose en puerto 8080...');