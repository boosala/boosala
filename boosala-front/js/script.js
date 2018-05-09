$("#start").click(function () {
    $("#search").show();
    $("#home").hide();
});

$("#back").click(function () {
    $("#home").show();
    $("#search").hide();
});

$("#back_logo").click(function () {
    $("#home").show();
    $("#search").hide();
});

$("#back_to_search").click(function () {
    $("#result").hide();
    $("#home").hide();
    $("#search").show();
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#picture')
                .attr('src', e.target.result)
                .width(250);
                

            // local storage of base64 of family's image for later display
            var picData = e.target.result.split(',')[1];
            localStorage.setItem("picBase64Data", picData);

        };
        reader.readAsDataURL(input.files[0]);
    }
}

$("#submit").click(function (){
    me = $( "#me" ).val();
    their = $( "#their" ).val();
    localStorage.setItem("me", me);
    localStorage.setItem("their", their);
    $("#their-name").text(their);

    $("#their-name-not-found").text(their);
    var sentence = "";
    if ($("#submit").text() === "ابحث"){
        sentence = "..."+"البحث جار عن "+their;
    }else{
        sentence = "Searching for "+their+"...";
    }
    $("#submit").html(sentence);

    ProcessImage();
    window.setTimeout(function() {$("#search").hide(); $("#home").hide();$("#submit").html("Find");}, 4000);
});


function parseData(dataVals) {
    // reconstruct uploaded image of the person
    var dataImage = localStorage.getItem('picBase64Data');

    var matches = dataVals["FaceMatches"];
    var matchFound = false;
    if (matches.length > 0) {
        for (var i = 0; i < matches.length; ++i) {
            var match = matches[i];
            if (match["Similarity"] >= 50) {
                matchFound = true;
                console.log("MATCH");
                
                var missing_person_f_img = document.getElementById('missing_person_f');
                missing_person_f_img.src = "data:image/png;base64," + dataImage;
                $("#result").show();
                return;
            }
        }
    }

    console.log("NO MATCH");
    console.log("show not found");
    
    var missing_person_nf_img = document.getElementById('missing_person_nf');
    missing_person_nf_img.src = "data:image/png;base64," + dataImage;

    $("#not-found").show();    
}

