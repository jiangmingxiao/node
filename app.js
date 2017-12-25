var PORT = 3011;

var http = require('http');
var url=require('url');
var fs=require('fs');
var mine=require('./mine').types;
var path=require('path');
var events=require('events');

var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    if (pathname.charAt(pathname.length - 1) == "/") {
            //如果访问目录
            pathname += "edit.html"; //指定为默认网页
        }
    var realPath = path.join("assets", pathname);
    //console.log(realPath);
    var ext = path.extname(realPath);

    ext = ext ? ext.slice(1) : 'unknown';
    fs.exists(realPath, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {
            fs.readFile(realPath, "binary", function (err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    response.end(err);
                } else {
                    var contentType = mine[ext] || "text/plain";
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
}).listen(PORT,()=>{
    console.log('done')
}).on('error',(e)=>{
    console.log(e);
})
let i = 0;
var proxy = new events.EventEmitter();
var test = function(callback) {
    proxy.once("selected", callback);
   
    i++
    proxy.emit("selected", i);
}
test(function(value){console.log(value)});
test(function(value){console.log(value)});
// console.log("path",module.paths);
// console.log("ext",require.extensions)