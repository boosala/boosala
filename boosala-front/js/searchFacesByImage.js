/*
  document.getElementById("fileToUpload").addEventListener("change", function (event) {
  ProcessImage();
  }, false); */

function ProcessImage() {
    AnonLog();
    var control = document.getElementById("fileToUpload");
    var file = control.files[0];
    // Load base64 encoded image 
    var reader = new FileReader();
    reader.onload = (function (theFile) {
	    return function (e) {
		var img = document.createElement('img');
		var image = null;
		img.src = e.target.result;
		var jpg = true;
		try {
		    image = atob(e.target.result.split("data:image/jpeg;base64,")[1]);
		} catch (e) {
		    jpg = false;
		}
		if (jpg == false) {
		    try {
			image = atob(e.target.result.split("data:image/png;base64,")[1]);
		    } catch (e) {
			alert("Not an image file Rekognition can process");
			return;
		    }
		}
		//unencode image bytes for Rekognition DetectFaces API 
		var length = image.length;
		imageBytes = new ArrayBuffer(length);
		var ua = new Uint8Array(imageBytes);
		for (var i = 0; i < length; i++) {
		    ua[i] = image.charCodeAt(i);
		}
		console.log("Searching database for matching face")
		//Call Rekognition  
		searchFacesByImage(imageBytes);
	    };
	})(file);
    reader.readAsDataURL(file);
}

//Provides anonymous log on to AWS services
function AnonLog() {
    // Configure the credentials provider to use your identity pool

    AWS.config.region = 'us-east-1'; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
	    IdentityPoolId: 'us-east-1:ca34290a-1e46-43fd-b6d8-6e4263335a0a',
	});
    // Make the call to obtain credentials
    AWS.config.credentials.get(function () {
	    // Credentials will be available when this function is called.
	    var accessKeyId = AWS.config.credentials.accessKeyId;
	    var secretAccessKey = AWS.config.credentials.secretAccessKey;
	    var sessionToken = AWS.config.credentials.sessionToken;
	});
}
//Search Faces by Image
function searchFacesByImage(imageData) {
    var rekognition = new AWS.Rekognition();
    var params = {
	   CollectionId: 'refugeeCollection', 
	   Image: { /* required */
	     Bytes: imageBytes || 'STRING_VALUE',  // no default yet...
	   },
	   FaceMatchThreshold: 50.0,
	   MaxFaces: 10
    };
  
  rekognition.searchFacesByImage(params, function(err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
      $("#not-found").show();
    }
    else     
      parseData(data);
      console.log(data);        // successful response
  });
}