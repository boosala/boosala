const AWS = require('aws-sdk'), fs = require('fs');
AWS.config.update({ region: 'us-east-2', accessKeyId: 'AKIAJO25TVMVWWL5RVRQ', secretAccessKey: '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' });

const path = __dirname + "/faces";


fs.readdir(__dirname + "/faces", (err, files) => {
    if(err) throw err;
    files.forEach(file => {
        uploadAndIndexFile(__dirname+"/faces/"+file, file);
    });
  })

// fi is without path and filename includes full path
function uploadAndIndexFile(filename, fi){
    // Read in the file, convert it to base64, store to S3
    fs.readFile(filename, function (err, data) {
        if (err) { throw err; }

        var base64data = new Buffer(data, 'binary');

        var s3 = new AWS.S3();
        s3.putObject({
            Bucket: 'testjedbucket',
            Key: fi,
            Body: base64data
        },function (resp) {
            console.log(arguments);
            console.log('Successfully uploaded package.');
        });
    });

    //Call indexFaces
    var rekognition = new AWS.Rekognition();

    var params = {
        CollectionId: 'refugeesCollection', /* required */
        Image: { /* required */
            S3Object: {
                Bucket: 'testjedbucket',
                Name: fi
            }
        },
        DetectionAttributes: [],
        ExternalImageId: fi
    };
    rekognition.indexFaces(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
    });
}
