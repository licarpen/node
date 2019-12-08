const querystring = require('querystring');
const fs = require('fs');
const formidable = require('formidable');

function start(response, postData) {
    console.log('Request handler "start" was called.');

    const body = `<html>
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <meta http-equiv="X-UA-Compatible" content="ie=edge">
                    </head>
                    <body>
                        <form action="/upload" enctype="multipart/form-data" method="post">
                            <input type="file" name="upload"/>
                            <input type="submit" value="Upload file"/>
                        </form>
                    </body>
                </html>`;

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(body);
    response.end();
}

function upload(response, request) {
    console.log('Request handler "upload" was called.');

    const form = new formidable.IncomingForm();
    console.log('about to parse');
    form.parse(request, function(error, fields, files){
        console.log('parsing done');

        fs.rename(files.upload.path, '/tmp/blackhole.png', function(error){
            if(error){
                fs.unlink('/tmp/blackhold.png');
                fs.rename(files.upload.path, '/tmp/blackhole.png');
            }
        });

        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write('received image: <br/>');
        response.write('<img src="/show" />');
        response.end();
    });
}

function show(response){
    console.log('Request handler "show" was called.');
    response.writeHead(200, { 'Content-Type': 'image/png' });
    fs.createReadStream('./tmp/blackhole.png').pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;