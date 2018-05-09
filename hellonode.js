//Load HTTP module
var http = require("http");
var shell = require("shelljs");
// var parser = require('exif-parser').create(buffer);
var JSON5 = require('json5');
var sharp = require('sharp');

//Create HTTP server and listen on port 8000 for requests
http.createServer(function (request, response) {

   // Set the response HTTP header with HTTP status and Content type
   response.writeHead(200, {'Content-Type': 'text/plain'});
   
   // Send the response body "Hello World"
   response.end('Hello World\n');
   
}).listen(8000);

// Print URL for accessing server
console.log('Server running at http://127.0.0.1:8000/')

// Convert refcampvid.mp4 video to sequence of frames in the frames folder
// var output = shell.exec("ffmpeg -i refcampvid.mp4 frames\\refcampvid_%05d.jpg").output;

// Load JSON file
// var json =  require("./refcampvid");
const fs = require("fs");
let rawdata = fs.readFileSync("refcampvid.json");
let refcampvid = JSON.parse(rawdata);
console.log(refcampvid['Faces'].length);

// Get video details from JSON
var framerate = 23.98;//refcampvid['VideoMetadata']['FrameRate'];
var vidwidth = refcampvid['VideoMetadata']['FrameWidth'];
var vidheight = refcampvid['VideoMetadata']['FrameHeight'];


// Iterate through the JSON list (list of persons)
for (var i = 0; i < Object.keys(refcampvid['Faces']).length; i++) {
   if (refcampvid['Faces'][i]['Face']['BoundingBox']) {
       var frame = Math.ceil(refcampvid['Faces'][i]['Timestamp'] / framerate);
       var x = Math.floor(refcampvid['Faces'][i]['Face']['BoundingBox']['Left'] * vidwidth);
       var y = Math.floor(refcampvid['Faces'][i]['Face']['BoundingBox']['Top'] * vidheight);
       var width = Math.floor(refcampvid['Faces'][i]['Face']['BoundingBox']['Width'] * vidwidth);
       var height = Math.floor(refcampvid['Faces'][i]['Face']['BoundingBox']['Height'] * vidheight);
   }
   // } else {
   //     var frame = Math.ceil(refcampvid['Persons'][i]['Timestamp'] / framerate);
   //     var x = Math.floor(refcampvid['Persons'][i]['Person']['Face']['BoundingBox']['Left'] * vidwidth);
   //     var y = Math.floor(refcampvid['Persons'][i]['Person']['Face']['BoundingBox']['Top'] * vidheight);
   //     var width = Math.floor(refcampvid['Persons'][i]['Person']['Face']['BoundingBox']['Width'] * vidwidth);
   //     var height = Math.floor(refcampvid['Persons'][i]['Person']['Face']['BoundingBox']['Height'] * vidheight);
   // }

   var s = "" + frame;
   while (s.length < (5 || 2)) {s = "0" + s;}
   // console.log(s);

   var istring = "" + refcampvid['Faces'][i]['Face']['Index'];
   while (istring.length < (5 || 2)) {istring = "0" + istring;}
   // console.log(istring);

    sharp("frames\\refcampvid_" + s + ".jpg")
       .extract({ left: x, top: y, width: width, height: height })
       .toFile("faces\\refcampvid_" + s + "_" + istring + ".png", function(err) {
            console.log(err);
        });
}

console.log(refcampvid['Faces'].length);
console.log("done");